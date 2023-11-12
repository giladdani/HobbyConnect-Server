import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    sender: String,
    receiver: String,
    creationDate: Date
})

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);
export default FriendRequest;