import { Reward } from './mail.reward';

export class GameMail {
  mid: number;
  title: string;
  content: string;
  rewards: Array<Reward>;
  receivedTime: Date;
  readTime: Date;
  read: boolean = false;
  delete: boolean = false;
  constructor(
    mid: number,
    title: string,
    content: string,
    rewards: Reward[],
    receivedTime: Date
  ) {
    this.mid = mid;
    this.title = title;
    this.content = content;
    this.rewards = rewards;
    this.receivedTime = receivedTime;
    this.readTime = receivedTime;
  }
}

export interface GameMail {
  title: string;
  content: string;
  rewards: Array<Reward>;
  receivedTime: Date;
  readTime: Date;
  read: boolean;
  delete: boolean;
}
