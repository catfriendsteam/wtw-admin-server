import schedule from 'node-schedule';
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
  const resultMail = await MailUserDao.insert(cmail);
  if (!resultMail) {
    return false;
  } else {
    schedule.scheduleJob(cmail._id.toString(), cmail.sendDate, () => {
      console.log(`send mail : ${cmail._id}-${cmail.mailId}-${new Date()}`);
      const updateMail = MailUserDao.updateForSend(cmail._id) //스케줄 해제
        ? schedule.cancelJob(cmail._id.toString())
        : false;
      return updateMail;
    });
    return cmail;
  }
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
