export class AdminInfo {
  sendDate: Date;
  isSend: boolean;
  constructor(sendDate: Date) {
    this.sendDate = sendDate;
    this.isSend = false;
  }
}
export class UserInfo {
  receivedTime: Date;
  readTime: Date;
  read: boolean;
  delete: boolean;
  constructor(receivedTime: Date) {
    this.receivedTime = receivedTime;
    this.readTime = new Date('0001-01-01');
    this.read = false;
    this.delete = false;
  }
}
