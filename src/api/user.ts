import express, { Request, Response } from 'express';
import * as yup from 'yup';
import { UserDto, User } from '../models/user';
import * as userService from '../service/user';

const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  username: yup.string().max(20).required(),
});
async function register(req: Request, res: Response) {
  const { email, password, username } = await userSchema.validateSync(req.body);
  return (await userService.createUser(email, password, username))
    ? res.status(201).json({ username: username })
    : res.status(400).json({});
}

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

async function login(req: Request, res: Response) {
  const { email, password } = await loginSchema.validateSync(req.body);
  const user = await userService.getUser(email, password);
  return user ? res.status(200).json({ user: user }) : res.status(400).json({});
}

const modifyUserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().notRequired().default(''),
  confirmPassword: yup.string().notRequired().default(''),
  username: yup.string().max(20).notRequired().default(''),
  // TODO: permission oneof 로 추가
});

async function modifyUser(req: Request, res: Response) {
  const {
    email,
    password,
    confirmPassword,
    username,
  } = await modifyUserSchema.validateSync(req.body);
  return (await userService.updateUser(
    email,
    password,
    confirmPassword,
    username
  ))
    ? res.status(200).json({ email: email })
    : res.status(400).json({});
}

function dropOut() {}

const router = express.Router();
router.post('/', register);
router.post('/login', login);
router.put('/', modifyUser);
router.delete('/', dropOut);

export { router as userRouter };
