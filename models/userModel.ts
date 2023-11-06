import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    fullName: String,
    creationDate: String,
    role: String,
    status: String,
    balance: Number
})

const User = mongoose.model('User', userSchema);
export default User;