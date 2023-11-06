import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: String,
    description: String,
    category: String,
    time: Date,
    location: String,
    price: Number,
    totalParticipants: Number,
    creator: String,
    creationDate: Date,
    participantsUsernames: [String]
})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;