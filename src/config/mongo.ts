import { MongoClient, Db } from 'mongodb';
import { mongoHost, mongoPort, mongoUser, mongoPass, mongoDb } from '../vars';

export async function getDatabase(): Promise<Db> {
  const uri = `mongodb:\/\/${mongoHost}:${mongoPort}`; //${mongoUser}:${mongoPass}@
  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongodb connect!`);
  return client.db(mongoDb);
}
