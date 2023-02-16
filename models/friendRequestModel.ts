import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    sender: String,
    receiver: String,
    creation_date: String
})

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);
export default FriendRequest;