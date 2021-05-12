import { MongoClient, Db } from 'mongodb';
import { mongoHost, mongoPort, mongoUser, mongoPass } from '../vars';

export async function getDatabase(dbName: string): Promise<Db> {
  const uri = `mongodb:\/\/${mongoHost}:${mongoPort}`; //${mongoUser}:${mongoPass}@
  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`${dbName} connect!`);
  return client.db(dbName);
}
