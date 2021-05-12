import { dbGame } from '../app';
import { GameMail } from '../models/mail.game';

const gameCollection = `users`;

export async function updateAll(mail: GameMail) {
  const collection = (await dbGame).collection(gameCollection);
  const doc = await collection.updateMany({}, { $push: { mail: mail } });
  return !!doc.modifiedCount;
}
