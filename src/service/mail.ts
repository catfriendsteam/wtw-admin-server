import schedule from 'node-schedule';
import Mail from '../models/mail';
import { CreateMailDto, ScheduleMailDto } from '../dto/mail';
import * as MailDao from '../dao/mail';
import { logger } from '../utils/logger';
import { GameMail } from '../models/mail.game';
import { updateAll } from '../dao/mail.game';

export function initial(dto: CreateMailDto) {
  const mail = new Mail(dto.title, dto.content, dto.rewards, dto.sendDate);
  mail.date = {
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mail.logs = [dto.log];
  const result = MailDao.insert(mail);
  return result;
}

export function get(_id: number) {
  //   console.log(_id);
  const result = MailDao.find(_id);
  return result;
}

export function getList(page: number) {
  /**
   * 1. 처음과 마
   */
}

export function delete_(_id: number) {
  console.log(`service1`);
  const result = MailDao.delete_(_id);
  console.log(`service2 ${result}`);
  return result;
}

export function scheduleMail(dto: ScheduleMailDto) {
  const mail = new GameMail(
    dto.mid,
    dto.title,
    dto.content,
    dto.rewards,
    dto.receivedTime
  );
  const jobName = `${dto.mid}-${dto.title}`;
  const job = schedule.scheduleJob(jobName, dto.receivedTime, async () => {
    logger.info(`JOB /mail | send mail : ${jobName}`);
    const result = (await updateAll(mail))
      ? schedule.cancelJob(jobName)
      : false;
    return result;
  });
}
