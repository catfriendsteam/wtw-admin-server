import { WriterLog, DateLog } from './common';
export class UserMail {
  _id: number = 0;
  mailId: number;
  date: DateLog = {
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  logs: Array<WriterLog>;
  group: string; // TODO group type 만들기
  sendDate: Date;
  isSend: boolean = false;

  constructor(
    mailId: number,
    group: string,
    sendDate: Date,
    logs: Array<WriterLog>
  ) {
    this.mailId = mailId;
    this.group = group;
    this.sendDate = sendDate;
    this.logs = logs;
  }
}

export interface CreateUserMailDto {
  mailId: number;
  group: string;
  sendDate: Date;
  log: WriterLog;
}

export interface ModifyUserMailDto {
  group: string;
  sendDate: Date;
  log: WriterLog;
}
