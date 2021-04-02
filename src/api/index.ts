import { Router } from 'express';
import { mailAdminRouter } from './mail.admin';
import { mailUserRouter } from './mail.user';
import { userRouter } from './user';

const router = Router();
router.use('/mail/admin', mailAdminRouter);
router.use('/mail/user', mailUserRouter);
router.use('/user', userRouter);

export default router;
