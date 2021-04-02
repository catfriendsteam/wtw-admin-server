import { db } from '../app';
import { Collection } from 'mongodb';

const counterCollection = `counters`;

export async function getNextSequence(collectionName: string): Promise<number> {
  const collection = (await db).collection(counterCollection);
  const doc = await collection.findOneAndUpdate(
    { _id: collectionName },
    {
      $inc: {
        seq: 1,
      },
    }
  );
  return doc.value.seq;
}
