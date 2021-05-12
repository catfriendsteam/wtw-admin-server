import express, { Request, Response } from 'express';
import { Reward, RewardType } from '../models/mail.reward';
import { WriterLog } from '../models/common';
import { CreateMailDto, ScheduleMailDto } from '../dto/mail';
import * as MailService from '../service/mail';
import * as yup from 'yup';
import { logger } from '../utils/logger';

const createMailSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  rewards: yup
    .array()
    .of(
      yup.object({
        // type: yup.string().required(), //oneOf 속성 추가하기
        type: yup.mixed<RewardType>().required(),
        degree: yup.number().default(0),
      })
    )
    .required(),
  sendDate: yup.date().default(new Date()),
  writer: yup.string(),
});
async function createMail(req: Request, res: Response) {
  const { title, content, rewards, sendDate, writer } =
    createMailSchema.validateSync(req.body);
  //   const writer = req.session.username;
  const rewardArr: Reward[] = [];
  for (const reward of rewards) {
    const add: Reward = new Reward(reward.type, reward.degree);
    rewardArr.push(add);
  }
  const log: WriterLog = {
    writer: writer,
    accessedAt: new Date(),
  };
  const dto: CreateMailDto = {
    title: title,
    content: content,
    rewards: rewards,
    sendDate: sendDate,
    log: log,
  };
  const result = await MailService.initial(dto);
  if (!result) {
    logger.error(`POST /mail | Failed to save Mail.`);
    return res.status(400).json({ success: 0 });
  }
  const scheduleDto: ScheduleMailDto = {
    mid: result,
    title: title,
    content: content,
    rewards: rewards,
    receivedTime: sendDate,
  };
  logger.info(`POST /mail | Success to save Mail.`);
  MailService.scheduleMail(scheduleDto);
  return res.status(201).json({ success: result });
}

async function getMail(req: Request, res: Response) {
  const _id = parseInt(req.params._id);
  const result = await MailService.get(_id);
  return !!result
    ? res.status(200).json({ mail: result })
    : res.status(400).json({});
}

function getMailList(req: Request, res: Response) {
  //   const pageNum = parseInt(req.params.page);
  //   const result = await MailService.getList(pageNum);
  //   return !!result
  //     ? res.status(200).json({ mails: result })
  //     : res.status(400).json({});
}

function modifyMail(req: Request, res: Response) {}

async function removeMail(req: Request, res: Response) {
  const _id = parseInt(req.params._id);
  //   const auth = req.session.~ 권한 시 삭제 가능 구현하기
  const result = await MailService.delete_(_id);
  return !!result
    ? res.status(204).json({})
    : res.status(400).json({ success: false });
}

const router = express.Router();
router.post('/', createMail);
router.get('/:_id', getMail);
router.get('/list/:page', getMailList);
router.put('/{_id}', modifyMail);
router.delete('/:_id', removeMail);

export { router as mailRouter };
