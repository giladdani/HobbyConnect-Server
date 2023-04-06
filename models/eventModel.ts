import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    description: String,
    category: String,
    time: Date,
    location: String,
    creation_date: Date,
    ticket_price: Number,
    tickets_left: Number
})

const Event = mongoose.model('Event', eventSchema);
export default Event;