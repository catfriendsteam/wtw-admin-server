import { dbAdmin } from '../app';
import { Collection } from 'mongodb';
import { getNextSequence } from './counter';
import Mail from '../models/mail';

const mailCollection = `mails`;

export async function insert(mail: Mail) {
  const collection: Collection<Mail> = (await dbAdmin).collection(
    mailCollection
  );
  mail._id = await getNextSequence(dbAdmin, mailCollection);
  const doc = await collection.insertOne(mail);
  return !!doc.insertedCount ? mail._id : 0;
}

export async function find(_id: number) {
  const collection: Collection<Mail> = (await dbAdmin).collection(
    mailCollection
  );
  const doc = collection.findOne({ _id: _id });
  return doc;
}

export async function updateFieldIsSend(_id: number) {
  const collection: Collection<Mail> = (await dbAdmin).collection(
    mailCollection
  );
  const doc = await collection.updateOne(
    { _id: _id },
    { $set: { isSend: true } }
  );
  return doc.modifiedCount;
}

export async function delete_(_id: number) {
  const collection: Collection<Mail> = (await dbAdmin).collection(
    mailCollection
  );
  const doc = await collection.findOneAndDelete({ _id: _id });
  return doc.value;
}
