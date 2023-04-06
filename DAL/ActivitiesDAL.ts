// @ts-ignore
import ActivityModel from '../models/activityModel.ts';

async function find_all_activities() {
    return ActivityModel.find({});
}

async function find_activity(title:string) {
    return ActivityModel.findOne({title: title});
}


async function insert_activity(activity:any) {
    // TODO: check if the db insertion succeeded or failed
    await ActivityModel.create(activity);
}

export default {
    find_all_activities,
    find_activity,
    insert_activity
}