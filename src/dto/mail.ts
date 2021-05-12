import { WriterLog } from '../models/common';
import { Reward } from '../models/mail.reward';
export interface CreateMailDto {
  title: string;
  content: string;
  rewards: Reward[];
  sendDate: Date;
  log: WriterLog;
}

export interface ScheduleMailDto {
  mid: number;
  title: string;
  content: string;
  rewards: Reward[];
  receivedTime: Date;
}
