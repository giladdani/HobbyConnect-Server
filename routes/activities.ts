import express from 'express';
import { StatusCodes } from 'http-status-codes';
// @ts-ignore
import utils from '../utils.ts';
// @ts-ignore
import activitiesDAL from '../DAL/ActivitiesDAL.ts';
let router = express.Router()

async function get_all_activities(req:any, res:any) {
    const activities = await activitiesDAL.find_all_activities();
    res.status(StatusCodes.OK).send(activities);
}

function create_activity(req:any, res:any) {
	let activity = req.body;
	activity.creation_date = new Date(Date.now()).toLocaleString().split(',')[0];
    activitiesDAL.insert_activity(activity)
    res.sendStatus(StatusCodes.CREATED);
}

router.get('/', (req, res) => { get_all_activities(req, res) })
router.post('/', utils.authenticate_token, (req, res) => { create_activity(req, res) })

export default router;