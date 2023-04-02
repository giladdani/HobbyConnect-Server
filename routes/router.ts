import { Router } from 'express';
// @ts-ignore
import users from './users.ts';
// @ts-ignore
import giftcodes from './giftcodes.ts';
// @ts-ignore
import games from './games.ts'
// @ts-ignore
import events from './events.ts'

let router = Router();

router.use('/users', users);
router.use('/giftcodes', giftcodes);
router.use('/games', games);
router.use('/events', events)

export default router;