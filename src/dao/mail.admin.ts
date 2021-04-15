import { dbAdmin } from '../app';
import { Collection } from 'mongodb';
import { getNextSequence } from './counter';
import { AdminMail } from '../models/mail.admin';

const mailCollection = `mails-admin`;

export async function insert(mail: AdminMail) {
  const collection: Collection<AdminMail> = (await dbAdmin).collection(
    mailCollection
  );
  mail._id = await getNextSequence(dbAdmin, mailCollection);
  const doc = await collection.insertOne(mail);
  return doc.insertedCount;
}

export async function find(_id: number) {
  const collection: Collection<AdminMail> = (await dbAdmin).collection(
    mailCollection
  );
  const doc = await collection.findOne({ _id: _id });
  return doc;
}

export async function update(mail: AdminMail) {
  const collection: Collection<AdminMail> = (await dbAdmin).collection(
    mailCollection
  );
  const doc = await collection.findOneAndReplace({ _id: mail._id }, mail);
  return doc.value;
}

export async function deleteMail(mailId: number) {
  const collection: Collection<AdminMail> = (await dbAdmin).collection(
    mailCollection
  );
  const doc = await collection.findOneAndDelete({ _id: mailId });
  return doc.ok;
}
