import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// @ts-ignore
import utils from '../utils.ts'
// @ts-ignore
import usersDAL from '../DAL/UsersDAL.ts'
import { StatusCodes } from 'http-status-codes';
let router = express.Router()

// API functions
async function login(req:any, res:any){
	const user = await usersDAL.find_user(req.body.username);
	if(!user){
		res.sendStatus(StatusCodes.NOT_FOUND);
	}
	else{
		bcrypt.compare(req.body.password, user.password, (err:any, result:any) => {
			if(!result){
				res.status(StatusCodes.UNAUTHORIZED).send("Incorrect username/password");
			}
			else{
				//TODO: check if user's status is active
				// 	if(user.status != utils.user_status.ACTIVE){
				// 		res.status(StatusCodes.FORBIDDEN).send("User status must be active to login");
				// 	}

				// Create access token
				const accessToken = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET!);
				res.status(StatusCodes.OK).send(accessToken);
			}
		})
	}
}

async function get_user_details(req:any, res:any){
	const userDetails = await usersDAL.get_user_details(req.username)
	if(userDetails){
		res.status(StatusCodes.OK).send(userDetails);
	}
	else{
		res.status(StatusCodes.UNAUTHORIZED).send({data: "No valid user token available"});
	}
}

async function create_user(req:any, res:any){
	// TODO: also check existing user by ID? or just get rid of this id field for good
	const existingUser = await usersDAL.find_user(req.body.username);
	if(existingUser){
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Username already exists");
	}
	else{
		let user = req.body;
		user.creationDate = new Date(Date.now()).toLocaleDateString('en-GB').split(',')[0];
		user.status = utils.user_status.CREATED;
		user.role = utils.user_roles.USER;
		user.balance = 0;
		user.friends = [];
	
		// hash password before storing it
		user.password = await bcrypt.hash(user.password, 10);
		usersDAL.insert_user(user);
		res.sendStatus(StatusCodes.CREATED);
	}
}

async function add_user_balance(req:any, res:any){
	const existingUser = await usersDAL.find_user(req.body.username);
	if(!existingUser){
		res.status(StatusCodes.NOT_FOUND).send("Username not found");
	}
	else{
		await usersDAL.add_user_balance(req.body.username, req.body.amount);
		res.sendStatus(StatusCodes.OK);
	}
}

async function get_friends(req:any, res:any){ 
	const friends = await usersDAL.get_friends(req.username);
	res.status(StatusCodes.OK).send(friends);
}

async function get_friend_requests(req:any, res:any) {
	const friendRequests = await usersDAL.get_friend_requests(req.username);
	res.status(StatusCodes.OK).send(friendRequests);
}

async function create_friend_request(req:any, res:any){
	if(req.username === req.body.receiver) {
		res.sendStatus(StatusCodes.FORBIDDEN);
	}
	else{
		const existingUser = await usersDAL.find_user(req.body.receiver);
		if(!existingUser){
			res.status(StatusCodes.NOT_FOUND).send("Username not found");
		}
		else{
			let request = {sender: req.username, receiver: req.body.receiver, creationDate: new Date(Date.now()).toLocaleString()}
			await usersDAL.create_friend_request(request);
			res.sendStatus(StatusCodes.CREATED);
		}
	}
}

async function update_friend_request_status(req:any, res:any){
	await usersDAL.update_friend_request_status(req.username, req.body.sender, req.body.isAccepted);
	res.sendStatus(StatusCodes.OK);
}

async function get_user_balance(req:any, res:any){
	const userBalance = await usersDAL.get_user_balance(req.username)
	if(userBalance){
		res.status(StatusCodes.OK).send(userBalance);
	}
	else{
		res.status(StatusCodes.UNAUTHORIZED).send({data: "No valid user token available"});
	}
}

// Routing
router.post('/login', async(req, res) => { login(req, res) })
router.get('/profile', utils.authenticate_token, (req, res) => { get_user_details(req, res) })
router.post('/', (req, res) => { create_user(req, res) })
router.get('/friends', utils.authenticate_token, (req, res) => { get_friends(req, res) })
router.get('/friends/requests', utils.authenticate_token, (req, res) => { get_friend_requests(req, res) })
router.post('/friends/requests', utils.authenticate_token, (req, res) => { create_friend_request(req, res) })
router.put('/friends/requests', utils.authenticate_token, (req, res) => { update_friend_request_status(req, res) })
router.get('/balance', utils.authenticate_token, (req, res) => { get_user_balance(req, res) })
router.put('/balance', utils.authenticate_token, (req, res) => { add_user_balance(req, res) })

export default router;