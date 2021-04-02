import { db } from '../app';
import { Collection } from 'mongodb';
import { User } from '../models/user';
import { getNextSequence } from './counter';

const userCollection = `users`;

export async function insert(user: User) {
  const collection: Collection<User> = (await db).collection(userCollection);
  user._id = await getNextSequence(userCollection);
  const doc = await collection.insertOne(user);
  return doc.insertedCount;
}

export async function find(email: string) {
  const collection: Collection<User> = (await db).collection(userCollection);
  const doc: User | null = await collection.findOne({ email: email });
  return doc ? doc : null;
}
