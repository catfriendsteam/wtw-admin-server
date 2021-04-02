import express, { Request, Response } from 'express';
import * as yup from 'yup';
import {
  Reward,
  Log,
  CreateAdminMailDto,
  ModifyAdminMailDto,
} from '../models/mail.admin';
import * as mailAdminService from '../service/mail.admin';

const createMailSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  rewards: yup
    .array()
    .of(
      yup.object({
        type: yup.string().required(), //oneOf 속성 추가하기
        degree: yup.number().default(0),
      })
    )
    .required(),
  writer: yup.string().required(),
});

async function createMail(req: Request, res: Response) {
  const { title, content, rewards, writer } = createMailSchema.validateSync(
    req.body
  );
  const rewardArr: Reward[] = [];
  for (const reward of rewards) {
    const add: Reward = { type: reward.type, degree: reward.degree };
    rewardArr.push(add);
  }
  const log: Log = { writer: writer, accessedAt: new Date() };
  const mail: CreateAdminMailDto = {
    title: title,
    content: content,
    rewards: rewardArr,
    log: log,
  };
  const resultMail = await mailAdminService.createMail(mail);
  return resultMail
    ? res.status(201).json(resultMail)
    : res.status(400).json(null);
}

function listMail() {}

const searchMailSchema = yup.number().required();

async function getMail(req: Request, res: Response) {
  const _id = searchMailSchema.validateSync(req.query.id);
  const mail = await mailAdminService.getMailById(_id);
  return mail ? res.status(200).json(mail) : res.status(404).json(null);
}

const modifyMailSchema = yup.object({
  content: yup.string().required(),
  rewards: yup
    .array()
    .of(
      yup.object({
        type: yup.string().required(), //oneOf 속성 추가하기
        degree: yup.number().default(0),
      })
    )
    .required(),
  writer: yup.string().required(),
});

async function modifyMail(req: Request, res: Response) {
  const _id = searchMailSchema.validateSync(req.query.id);
  const { content, rewards, writer } = modifyMailSchema.validateSync(req.body);
  const rewardArr: Reward[] = [];
  for (const reward of rewards) {
    const add: Reward = { type: reward.type, degree: reward.degree };
    rewardArr.push(add);
  }
  const log: Log = { writer: writer, accessedAt: new Date() };
  const mail: ModifyAdminMailDto = {
    content: content,
    rewards: rewardArr,
    log: log,
  };
  const resultMail = await mailAdminService.updateMailById(_id, mail);
  return resultMail
    ? res.status(201).json(resultMail)
    : res.status(400).json(null);
}

async function removeMail(req: Request, res: Response) {
  const _id = searchMailSchema.validateSync(req.query.id);
  return (await mailAdminService.deleteMailById(_id))
    ? res.status(204).json(null)
    : res.status(400).json(null);
}

const router = express.Router();
router.get('/list', listMail);
router.get('/', getMail);
router.post('/', createMail);
router.put('/', modifyMail);
router.delete('/', removeMail);

export { router as mailAdminRouter };
