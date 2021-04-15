import { WriterLog, DateLog } from './common';
export class UserMail {
  _id: number = 0;
  mailId: number;
  date: DateLog = {
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  logs: Array<WriterLog>;
  group: GroupType; // TODO group type 만들기
  sendDate: Date;
  isSend: boolean = false;

  constructor(
    mailId: number,
    group: GroupType,
    sendDate: Date,
    logs: Array<WriterLog>
  ) {
    this.mailId = mailId;
    this.group = group;
    this.sendDate = sendDate;
    this.logs = logs;
  }
}

// export const GROUP = ['All', 'Android', 'iOS'] as const;
// export type GroupType = typeof GROUP;
export enum GroupType {
  All,
  Android,
  iOS,
}

export interface CreateUserMailDto {
  mailId: number;
  group: GroupType;
  sendDate: Date;
  log: WriterLog;
}

export interface ModifyUserMailDto {
  group: GroupType;
  sendDate: Date;
  log: WriterLog;
}
