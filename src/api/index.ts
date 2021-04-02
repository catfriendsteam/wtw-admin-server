import { Router } from 'express';
import { mailAdminRouter } from './mail.admin';
import { userRouter } from './user';

const router = Router();
router.use('/mail/admin', mailAdminRouter);
router.use('/user', userRouter);

export default router;
