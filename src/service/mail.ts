import schedule from 'node-schedule';
import Mail from '../models/mail';
import { Reward } from '../models/mail.reward';
import { WriterLog } from '../models/common';
import * as MailDao from '../dao/mail';
import { logger } from '../utils/logger';
import { GameMail } from '../models/mail.game';
import { updateAll, updateTargets } from '../dao/mail.game';

export async function initial(
  title: string,
  content: string,
  rewards: Reward[],
  sendDate: Date,
  writer: string,
  targets: string[]
) {
  const log: WriterLog = {
    writer: writer,
    accessedAt: new Date(),
  };
  const now = new Date();

  if (sendDate.getTime() <= now.getTime()) {
    // 예약하고 싶은 날이 지났을 때 - 현재 기준으로 5분 뒤에 우편 예약
    sendDate.setDate(now.getDate());
    sendDate.setTime(now.getTime());
    sendDate.setMinutes(sendDate.getMinutes() + 5);
  }
  const mail = new Mail(title, content, rewards, sendDate, targets, [log]);

  mail.date = {
    createdAt: now,
    updatedAt: now,
  };

  const result = await MailDao.insert(mail); // 관리자 우편 DB에 저장
  return result;
}

export function get(_id: number) {
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

export function scheduleMail(
  mid: number,
  title: string,
  content: string,
  rewards: Reward[],
  sendDate: Date,
  targets: string[]
) {
  const mail = new GameMail(mid, title, content, rewards, sendDate);
  const jobName = `${mid}-${title}`;
  try {
    const job = schedule.scheduleJob(jobName, sendDate, async () => {
      if (targets[0] === 'ALL') {
        const isUpdate = await updateAll(mail);
        logger.info(`JOB /mail | send mail ALL users : ${jobName}`);
        return isUpdate ? schedule.cancelJob(jobName) : false;
      } else {
        const isUpdate = await updateTargets(mail, targets);
        logger.info(
          `JOB /mail | send mail users-${targets.length}  : ${jobName}`
        );
        return isUpdate ? schedule.cancelJob(jobName) : false;
      }
    });
  } catch (e) {
    logger.error(e);
  }
}
