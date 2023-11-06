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
    activity.creator = req.username;
    activity.participantsIds = [];
    activity.participantsCount = 0;
	activity.creationDate = new Date(Date.now()).toLocaleString().split(',')[0];
    activitiesDAL.insert_activity(activity)
    res.sendStatus(StatusCodes.CREATED);
}

async function sign_user_to_activity(req:any, res:any){
    let activity = req.body.activity;
    if(activity.participantsUsernames.includes(req.username)){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("You already signed up")
    }
    else{
        activity.participantsUsernames.push(req.username);
        let isSucceed = await activitiesDAL.update_activity_participants(activity);
        if(isSucceed){
            res.sendStatus(StatusCodes.OK);
        }
        else{
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

router.get('/', (req, res) => { get_all_activities(req, res) })
router.post('/', utils.authenticate_token, (req, res) => { create_activity(req, res) })
router.post('/signup', utils.authenticate_token, (req, res) => sign_user_to_activity(req, res) )

export default router;