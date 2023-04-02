// @ts-ignore
import EventModel from '../models/eventModel.ts';

async function find_all_events() {
    return EventModel.find({});
}

async function find_event(title:string) {
    return EventModel.findOne({title: title});
}


async function insert_event(event:any) {
    // TODO: check if the db insertion succeeded or failed
    await EventModel.create(event);
}

export default {
    find_all_events,
    find_event,
    insert_event
}