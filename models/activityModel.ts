import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: String,
    description: String,
    creator: String,
    category: String,
    time: Date,
    location: String,
    creation_date: Date,
    ticket_price: Number,
    tickets_left: Number
})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;