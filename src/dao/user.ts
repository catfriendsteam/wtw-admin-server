import { dbAdmin } from '../app';
import { Collection } from 'mongodb';
import { UserDto, User, Permission } from '../models/user';
import { getNextSequence } from './counter';

const userCollection = `users`;

export async function insert(user: UserDto) {
  const collection: Collection<User> = (await dbAdmin).collection(
    userCollection
  );
  const newUser = new User(user);
  newUser._id = await getNextSequence(dbAdmin, userCollection);
  const doc = await collection.insertOne(newUser);
  return !!doc.insertedCount;
}

export async function find(email: string) {
  const collection: Collection<User> = (await dbAdmin).collection(
    userCollection
  );
  const doc: User | null = await collection.findOne({ email: email });
  return doc ? doc : null;
}

export async function update(user: UserDto, permission?: Permission) {
  const collection: Collection<User> = (await dbAdmin).collection(
    userCollection
  );
  // const options = {upsert: true};
  const filter = { email: user.email };
  let updateObj: any = {};
  if (user.password) {
    updateObj.password = user.password;
  }
  if (user.username) {
    updateObj.username = user.username;
  }
  if (permission) {
    updateObj.permission = permission;
  }
  const doc = await collection.updateOne(filter, { $set: updateObj });
  return !!doc.result.ok;
}

export async function delete_(email: string, username: string) {
  const collection: Collection<User> = (await dbAdmin).collection(
    userCollection
  );
}
