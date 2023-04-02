import express from 'express';
import { StatusCodes } from 'http-status-codes';
// @ts-ignore
import utils from '../utils.ts';
// @ts-ignore
import eventsDAL from '../DAL/EventsDAL.ts';
let router = express.Router()

async function get_all_events(req:any, res:any) {
    const events = await eventsDAL.find_all_events();
    res.status(StatusCodes.OK).send(events);
}

function create_event(req:any, res:any) {
	let event = req.body;
	event.creation_date = new Date(Date.now()).toLocaleString().split(',')[0];
    eventsDAL.insert_event(event)
    res.sendStatus(StatusCodes.CREATED);
}


router.get('/', (req, res) => { get_all_events(req, res) })
router.post('/', utils.authenticate_token, (req, res) => { create_event(req, res) })

// module.exports = router;
export default router;