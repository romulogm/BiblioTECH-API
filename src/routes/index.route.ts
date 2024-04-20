import * as express from 'express';

import defaultRouter from './default/default.route';
import authRouter from './auth/auth.route';
import meRouter from './me/me.route';
import userRouter from './user/user.route';
import collectionRouter from './collection/collection.route';
import bookRouter from './book/book.route';


const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/me', meRouter);
router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/book', bookRouter);


export default router;
