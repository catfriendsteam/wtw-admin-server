import { dbGame } from '../app';
import { GameMail } from '../models/mail.game';

const gameCollection = `users`;

export async function updateAll(mail: GameMail) {
  const collection = (await dbGame).collection(gameCollection);
  const doc = await collection.updateMany({}, { $push: { mail: mail } });
  return !!doc.modifiedCount;
}

export async function updateTargets(mail: GameMail, targets: string[]) {
  const collection = (await dbGame).collection(gameCollection);
  let count = 0;
  for (const target of targets) {
    const doc = await collection.updateOne(
      { uuid: target },
      { $push: { mail: mail } }
    );
    count += doc.modifiedCount;
  }
  return targets.length === count;
}
