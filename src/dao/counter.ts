import { dbAdmin } from '../app';
import { Db, Collection } from 'mongodb';

const counterCollection = `counters`;

export async function getNextSequence(
  db: Promise<Db>,
  collectionName: string
): Promise<number> {
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
