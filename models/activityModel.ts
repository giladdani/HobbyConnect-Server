import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: String,
    description: String,
    category: String,
    time: Date,
    location: String,
    price: Number,
    totalParticipants: {
        type: Number,
        default: 0
    },
    creator: String,
    creationDate: String,
    participantsUsernames: [String]
})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;