import express, { Request, Response } from 'express';
import { RewardType } from '../models/mail.reward';
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
        type: yup.mixed<RewardType>().required(),
        degree: yup.number().default(0),
      })
    )
    .required(),
  sendDate: yup.date().default(new Date()),
  writer: yup.string().default('admin'),
  targets: yup.array().of(yup.string()),
});
async function createMail(req: Request, res: Response) {
  try {
    const { title, content, rewards, sendDate, writer, targets } =
      createMailSchema.validateSync(req.body);
    // const rewardArr: Reward[] = [];
    // for (const reward of rewards) {
    //   const add: Reward = new Reward(reward.type, reward.degree);
    //   rewardArr.push(add);
    // }

    const result = await MailService.initial(
      title,
      content,
      rewards,
      sendDate,
      writer,
      targets
    );

    if (!result) {
      logger.error(`POST /mail | Failed to save Mail.`);
      return res.status(400).json({ success: false });
    }
    logger.info(`POST /mail | Success to save Mail.`);
    MailService.scheduleMail(
      result,
      title,
      content,
      rewards,
      sendDate,
      targets
    );
    return res.status(201).json({ success: result });
  } catch (e) {
    logger.error(e);
    return res.status(400).json({ success: false });
  }
}

async function getMail(req: Request, res: Response) {
  const _id = parseInt(req.params._id);
  const result = await MailService.get(_id);
  return !!result
    ? res.status(200).json({ mail: result })
    : res.status(400).json({});
}

function getMailList(req: Request, res: Response) {}

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
