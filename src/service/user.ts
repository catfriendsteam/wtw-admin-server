import argon2 from 'argon2';
import * as UserDao from '../dao/user';
import { UserDto } from '../models/user';

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  const user: UserDto = {
    email: email,
    password: password,
    username: username,
  };
  if (await UserDao.find(user.email)) {
    return false; //중복 유저 존재
  } else {
    user.password = await argon2.hash(user.password);
    return (await UserDao.insert(user)) ? true : false;
  }
}

export async function getUser(email: string, password: string) {
  try {
    const user = await UserDao.find(email);
    if (!user) {
      return false;
    }
    const verify = await argon2.verify(user.password, password);
    return verify;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function updateUser(
  email: string,
  password: string,
  confirmPassword: string,
  username: string
) {
  if (password) {
    if (password === confirmPassword) {
      try {
        const foundUser = await UserDao.find(email);
        if (!foundUser) {
          console.log(1);
          return false;
        }
        // const verify = await argon2.verify(foundUser.password, password);
        const hash = await argon2.hash(password);
        const user: UserDto = {
          email: email,
          password: hash,
          username: '',
        };
        // return verify ? await UserDao.update(user) : false;
        return UserDao.update(user);
      } catch (e) {
        console.log(e);
        return false;
      }
    } else {
      return false;
    }
  }
  if (username) {
    const user: UserDto = {
      email: email,
      password: '',
      username: username,
    };
    return UserDao.update(user);
  }
  return false;
}

export function deleteUser() {}
