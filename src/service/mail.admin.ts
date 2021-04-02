import { getNextSequence } from '../dao/counter';
import * as MailAdminDao from '../dao/mail.admin';
import {
  AdminMail,
  CreateAdminMailDto,
  ModifyAdminMailDto,
} from '../models/mail.admin';

export async function createMail(mail: CreateAdminMailDto) {
  const cmail = new AdminMail(mail.title, mail.content, mail.rewards, [
    mail.log,
  ]);
  return (await MailAdminDao.insert(cmail)) ? cmail : false;
}

export function getMailById(id: number) {
  return MailAdminDao.find(id);
}

export async function updateMailById(id: number, mail: ModifyAdminMailDto) {
  const oldMail = await MailAdminDao.find(id);
  if (!oldMail) {
    return false; //메일 없음
  }
  const cmail = new AdminMail(
    oldMail.title,
    mail.content,
    mail.rewards,
    oldMail.logs.concat(mail.log)
  );
  cmail._id = id;
  cmail.date.createdAt = oldMail.date.createdAt;
  return (await MailAdminDao.update(cmail)) ? cmail : false;
}

export function deleteMailById(id: number) {
  return MailAdminDao.deleteMail(id);
}
