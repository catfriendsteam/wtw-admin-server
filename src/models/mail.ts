import { DateLog, WriterLog } from './common';
import Reward from './mail.reward';

class Mail {
  _id: number;
  title: string;
  content: string;
  rewards: Reward[];
  target: string[];
  sendDate: Date;
  isSend: boolean;
  date: DateLog;
  logs: WriterLog[];

  constructor(
    title: string,
    content: string,
    rewards: Reward[],
    sendDate: Date,
    target: string[],
    logs: WriterLog[]
  ) {
    this._id = 0;
    this.title = title;
    this.content = content;
    this.rewards = rewards;
    this.target = target;
    this.sendDate = sendDate;
    this.isSend = false;
    this.logs = logs;
  }
}

export default Mail;
