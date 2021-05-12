import { DateLog, WriterLog } from './common';
import { AdminInfo, UserInfo } from './mail.info';
import Reward from './mail.reward';

class Mail {
  _id: number;
  title: string;
  content: string;
  rewards: Reward[];
  date: DateLog;
  logs: WriterLog[];
  admin: AdminInfo;
  user: UserInfo;
  constructor(
    title: string,
    content: string,
    rewards: Reward[],
    sendDate: Date
  ) {
    this._id = 0;
    this.title = title;
    this.content = content;
    this.rewards = rewards;
    this.admin = new AdminInfo(sendDate);
    this.user = new UserInfo(sendDate);
  }
}

export default Mail;
