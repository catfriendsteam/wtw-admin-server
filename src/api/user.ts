import express, { Request, Response } from 'express';
import * as yup from 'yup';
import { User } from '../models/user';
import * as userService from '../service/user';

const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  username: yup.string().max(20).required(),
});
async function register(req: Request, res: Response) {
  const { email, password, username } = await userSchema.validateSync(req.body);
  const user = new User(email, password, username);
  return (await userService.createUser(user))
    ? res.status(201).json(user)
    : res.status(400).json(null);
}

function getUsers() {}

function getUser() {}

function updateUser() {}

function deleteUser() {}

const router = express.Router();
router.get('/list', getUsers);
router.get('/', getUser);
router.post('/', register);
router.put('/', updateUser);
router.delete('/', deleteUser);

export { router as userRouter };
