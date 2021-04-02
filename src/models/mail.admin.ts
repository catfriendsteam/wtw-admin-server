import { DateLog, WriterLog } from './common';

export class AdminMail {
  _id: number = 0;
  title: string;
  content: string;
  rewards: Array<Reward>;
  date: DateLog = { createdAt: new Date(), updatedAt: new Date() };
  logs: Array<WriterLog> = [];
  constructor(
    title: string,
    content: string,
    rewards: Array<Reward> = [],
    logs: Array<WriterLog>
  ) {
    this.title = title;
    this.content = content;
    this.rewards = rewards;
    this.logs = logs;
  }
}

export interface Reward {
  type: string; //RewardType;
  degree: number;
}

const REWARD_TYPE = {
  MAIL: 'notice',
  DIA: 'dia',
  MONEY: 'money',
  HEART: 'heart',
  NYANCOIN: 'nyancoin',
  FRIENDSHIP: 'friendship',
  NYANTICKET: 'nyanticket',
  NYANPAE: 'nyanpae',
  JOKBO: 'jokbo',
  STAMINADRINK: 'staminadrink',
  RODANDBALL: 'rodandball',
  DAILY_7: 'daily_7',
  DAILY_30: 'daily_30',
  LIMIT_1: 'limit_1',
  LIMIT_2: 'limit_2',
  BUFF_1: 'buff_1',
  BUFF_2: 'buff_2',
  BUFF_3: 'buff_3',
  BOX_100: 'box_100',
} as const;
type RewardType = typeof REWARD_TYPE[keyof typeof REWARD_TYPE];

export interface CreateAdminMailDto {
  title: string;
  content: string;
  rewards?: Array<Reward>;
  log: WriterLog;
}
export interface ModifyAdminMailDto {
  content: string;
  rewards?: Array<Reward>;
  log: WriterLog;
}
