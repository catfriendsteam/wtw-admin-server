import { Router } from 'express';
import { userRouter } from './user';
import { mailRouter } from './mail';

const router = Router();
router.use('/user', userRouter);
router.use('/mail', mailRouter);

export default router;
