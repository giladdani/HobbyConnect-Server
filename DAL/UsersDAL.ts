// @ts-ignore
import UserModel from '../models/userModel.ts';
// @ts-ignore
import FriendRequestModel from '../models/friendRequestModel.ts'

// returns the entire user (including sensitive information)
async function find_user(username:string) {
    return UserModel.findOne({username: username});
}

// returns only the non-sensitive information
async function get_users() {
    return UserModel.find({}).select("-password")
}

// returns only the non-sensitive information
async function get_user_details(username:string) {
    return UserModel.findOne({username: username}).select("-password");
}

async function insert_user(user:any) {
    // TODO: check if the db insertion succeeded or failed
    await UserModel.create(user);
}

async function get_friends(username:string) {
    return UserModel.findOne({username: username}).select("friends");
}

async function get_friend_requests(username:string) {
    return FriendRequestModel.find({receiver: username});
}

async function create_friend_request(request:any) {
    await FriendRequestModel.create(request);
}

async function update_friend_request_status(username:string, sender:string, isAccepted:boolean) {
    if(isAccepted) {
        const bulkUpadte = [
            {
              updateOne: {
                filter: { username: username },
                update: { $addToSet: { friends: sender } },
              },
            },
            {
              updateOne: {
                filter: { username: sender },
                update: { $addToSet: { friends: username } },
              },
            },
          ];
          
        await UserModel.bulkWrite(bulkUpadte);
    }
    await FriendRequestModel.deleteOne({sender: sender, receiver: username});
}

async function get_user_balance(username:string) {
    return UserModel.findOne({username: username}).select("balance");
}

async function add_user_balance(username:string, amount:number) {
    // TODO: check if the db insertion succeeded or failed
    await UserModel.updateOne({username: username}, {$inc: {balance: amount}});
}

export default {
    find_user,
    get_users,
    get_user_details,
    insert_user,
    get_friends,
    get_friend_requests,
    create_friend_request,
    update_friend_request_status,
    get_user_balance,
    add_user_balance
}