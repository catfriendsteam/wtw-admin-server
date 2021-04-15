import express, { Request, Response } from 'express';
import * as yup from 'yup';
import { WriterLog } from '../models/common';
import {
  CreateUserMailDto,
  ModifyUserMailDto,
  GroupType,
} from '../models/mail.user';
import * as MailUserService from '../service/mail.user';

const scheduledMailSchema = yup.object({
  mailId: yup.number().required(),
  group: yup.mixed<GroupType>().required(), //oneOf 구현하기
  now: yup.date().default(() => new Date()),
  sendDate: yup
    .date()
    .min(yup.ref('now'), "sendDate can't be before now")
    .required(),
  writer: yup.string().required(),
});

async function scheduledMail(req: Request, res: Response) {
  const { mailId, group, sendDate, writer } = scheduledMailSchema.validateSync(
    req.body
  );
  const log: WriterLog = {
    writer: writer,
    accessedAt: new Date(),
  };
  const mail: CreateUserMailDto = {
    mailId: mailId,
    group: group,
    sendDate: sendDate,
    log: log,
  };
  const resultMail = await MailUserService.createMail(mail);
  return resultMail
    ? res.status(201).json(resultMail)
    : res.status(400).json(null);
}

function listMail() {}

const searchMailSchema = yup.number().required();
async function getMail(req: Request, res: Response) {
  const _id = searchMailSchema.validateSync(req.query.id);
  const mail = await MailUserService.getMailById(_id);
  return mail ? res.status(200).json(mail) : res.status(404).json(null);
}

const modifyMailSchema = yup.object({
  group: yup.mixed<GroupType>().required(), //yup.string().required(), //oneOf 구현하기
  now: yup.date().default(() => new Date()),
  sendDate: yup
    .date()
    .min(yup.ref('now'), "sendDate can't be before now")
    .required(),
  writer: yup.string().required(),
});

async function modifyMail(req: Request, res: Response) {
  const _id = searchMailSchema.validateSync(req.query.id);
  const { group, sendDate, writer } = modifyMailSchema.validateSync(req.body);
  const log: WriterLog = {
    writer: writer,
    accessedAt: new Date(),
  };
  const mail: ModifyUserMailDto = {
    group: group,
    sendDate: sendDate,
    log: log,
  };
  const resultMail = await MailUserService.updateMailById(_id, mail);
  return resultMail
    ? res.status(200).json(resultMail)
    : res.status(400).json(null);
}

async function removeMail(req: Request, res: Response) {
  const _id = searchMailSchema.validateSync(req.query.id);
  return (await MailUserService.deleteMailById(_id))
    ? res.status(204).json({})
    : res.status(400).json(null);
}

const router = express.Router();
router.get('/list', listMail);
router.get('/', getMail);
router.post('/', scheduledMail);
router.put('/', modifyMail);
router.delete('/', removeMail);

export { router as mailUserRouter };
