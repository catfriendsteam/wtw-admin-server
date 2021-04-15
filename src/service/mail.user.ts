import schedule from 'node-schedule';
import * as MailUserDao from '../dao/mail.user';
import {
  CreateUserMailDto,
  ModifyUserMailDto,
  UserMail,
} from '../models/mail.user';
import * as GameService from './mail.game';
import * as AdminService from './mail.admin';
import { AdminMail } from '../models/mail.admin';

function scheduleMail(userMail: UserMail, adminMail: AdminMail) {
  const job = schedule.scheduleJob(
    userMail._id.toString(),
    userMail.sendDate,
    () => {
      console.log(
        `send mail : ${userMail._id}-${userMail.mailId}-${new Date()}`
      );
      const result = GameService.sendMail(adminMail, userMail);
      if (!result) {
        return false;
      }
      const updateMail = MailUserDao.updateForSend(userMail._id)
        ? schedule.cancelJob(userMail._id.toString())
        : false;
      return updateMail;
    }
  );
  return job;
}

export async function createMail(mail: CreateUserMailDto) {
  const cmail = new UserMail(mail.mailId, mail.group, mail.sendDate, [
    mail.log,
  ]);
  const resultMail = await MailUserDao.insert(cmail);
  const adminMail = await AdminService.getMailById(cmail.mailId);
  if (!resultMail || !adminMail) {
    return null;
  } else {
    const result = scheduleMail(cmail, adminMail);
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
  const resultMail = await MailUserDao.update(cmail);
  const adminMail = await AdminService.getMailById(cmail.mailId);
  if (!resultMail || !adminMail) {
    return null;
  } else {
    schedule.cancelJob(resultMail._id.toString());
    const result = scheduleMail(cmail, adminMail);
    return cmail;
  }
}
export function deleteMailById(id: number) {
  return MailUserDao.deleteMail(id);
}
