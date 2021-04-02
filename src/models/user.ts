export class User {
  _id: number = 0;
  email: string;
  password: string;
  username: string;
  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
export interface IUser {
  email: string;
  password: string;
  username: string;
}
