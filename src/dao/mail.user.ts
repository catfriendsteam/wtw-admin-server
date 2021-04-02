import { db } from '../app';
import { Collection } from 'mongodb';
import { getNextSequence } from './counter';
import { UserMail } from '../models/mail.user';

const mailCollection = `mails-user`;

export async function insert(mail: UserMail) {
  const collection: Collection<UserMail> = (await db).collection(
    mailCollection
  );
  mail._id = await getNextSequence(mailCollection);
  const doc = await collection.insertOne(mail); //adminmail 있는지 확인하는 작업 필요
  return doc.insertedCount;
}

export async function find(_id: number) {
  const collection: Collection<UserMail> = (await db).collection(
    mailCollection
  );
  const doc = await collection.findOne({ _id: _id });
  return doc;
}

export async function update(mail: UserMail) {
  const collection: Collection<UserMail> = (await db).collection(
    mailCollection
  );
  const doc = await collection.findOneAndReplace({ _id: mail._id }, mail);
  return doc.value;
}

export async function deleteMail(mailId: number) {
  const collection: Collection<UserMail> = (await db).collection(
    mailCollection
  );
  const doc = await collection.findOneAndDelete({ _id: mailId });
  return doc.ok;
}

export async function updateForSend(mailId: number) {
  const collection: Collection<UserMail> = (await db).collection(
    mailCollection
  );
  const doc = await collection.findOneAndUpdate(
    { _id: mailId },
    { $set: { isSend: true } }
  );
  return doc.value;
}
