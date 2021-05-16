import { DateLog, WriterLog } from './common';
import { AdminInfo, UserInfo } from './mail.info';
import Reward from './mail.reward';

class Mail {
  _id: number;
  title: string;
  content: string;
  rewards: Reward[];
  date: DateLog;
  target: string[];
  logs: WriterLog[];
  admin: AdminInfo;
  user: UserInfo;
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
    this.logs = logs;
    this.admin = new AdminInfo(sendDate);
    this.user = new UserInfo(sendDate);
  }
}

export default Mail;
