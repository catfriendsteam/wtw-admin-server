export class User {
  _id: number = 0;
  email: string;
  password: string;
  username: string;
  permission: Permission;
  constructor(user: UserDto) {
    this.email = user.email;
    this.password = user.password;
    this.username = user.username;
    this.permission = 'NONE';
  }
}
export interface UserDto {
  email: string;
  password: string;
  username: string;
}

export type Permission = 'NONE' | 'READONLY' | 'ADMIN';
