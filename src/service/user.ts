import argon2 from 'argon2';
import * as UserDao from '../dao/user';
import { User } from '../models/user';

export async function createUser(user: User) {
  if (await UserDao.find(user.email)) {
    return false; //중복 유저 존재
  } else {
    user.password = await argon2.hash(user.password);
    return (await UserDao.insert(user)) ? true : false;
  }
}
