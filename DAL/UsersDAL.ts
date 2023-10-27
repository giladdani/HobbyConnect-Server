// @ts-ignore
import UserModel from '../models/userModel.ts';
// @ts-ignore
import FriendRequestModel from '../models/friendRequestModel.ts'

// returns the entire user (including sensitive information)
async function find_user(username:string) {
    return UserModel.findOne({username: username});
}

// returns only the non-sensitive information
async function get_user_details(username:string) {
    return UserModel.findOne({username: username}).select("-password");
}

async function insert_user(user:any) {
    // TODO: check if the db insertion succeeded or failed
    await UserModel.create(user);
}

async function add_user_balance(username:string, amount:number) {
    // TODO: check if the db insertion succeeded or failed
    await UserModel.updateOne({username: username}, {$inc: {balance: amount}});
}

async function create_friend_request(request:any) {
    await FriendRequestModel.create(request);
}

async function get_user_balance(username:any) {
    return UserModel.findOne({username: username}).select("balance");
}

export default {
    find_user,
    get_user_details,
    insert_user,
    add_user_balance,
    create_friend_request,
    get_user_balance
}