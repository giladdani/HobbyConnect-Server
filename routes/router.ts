import { Router } from 'express';
// @ts-ignore
import users from './users.ts';
// @ts-ignore
import giftcodes from './giftcodes.ts';
// @ts-ignore
import games from './games.ts'

let router = Router();

router.use('/users', users);
router.use('/giftcodes', giftcodes);
router.use('/games', games);

export default router;