import { Router } from 'express';
// @ts-ignore
import users from './users.ts';
// @ts-ignore
import giftcodes from './giftcodes.ts';
// @ts-ignore
import activities from './activities.ts'
// @ts-ignore

let router = Router();
router.use('/users', users);
router.use('/giftcodes', giftcodes);
router.use('/activities', activities);

export default router;