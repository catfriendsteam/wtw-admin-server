import * as MailUserDao from '../dao/mail.user';
import {
  CreateUserMailDto,
  ModifyUserMailDto,
  UserMail,
} from '../models/mail.user';

export async function createMail(mail: CreateUserMailDto) {
  const cmail = new UserMail(mail.mailId, mail.group, mail.sendDate, [
    mail.log,
  ]);
  return (await MailUserDao.insert(cmail)) ? cmail : false;
}
export function getMailById(id: number) {
  return MailUserDao.find(id);
}
export async function updateMailById(id: number, mail: ModifyUserMailDto) {
  const oldMail = await MailUserDao.find(id);
  if (!oldMail) {
    return false; //메일 없음
  }
  const cmail = new UserMail(
    id,
    mail.group,
    mail.sendDate,
    oldMail.logs.concat(mail.log)
  );
  cmail._id = id;
  cmail.date.createdAt = oldMail.date.createdAt;
  return (await MailUserDao.update(cmail)) ? cmail : false;
}
export function deleteMailById(id: number) {
  return MailUserDao.deleteMail(id);
}
