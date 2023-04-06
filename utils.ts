import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'

const user_status = {
	CREATED: "created",
	ACTIVE: "active",
	SUSPENDED: "suspended"
}

const user_roles = {
	USER: "user",
	ADMIN: "admin"
}

// const activity_category = {
// 	CONVENTION: "convention";
// 	TOURNAMENT: "tournament";
// 	LAN_PARTY: "lan party";
// 	GAME_AWARDS: "game awards";
// }


function authenticate_token(req:any, res:any, next:any){
	const token = req.headers['authorization'];
	if(token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err:any, data:any) => {
		if(err) return res.sendStatus(StatusCodes.UNAUTHORIZED)
		req.username = data.username;
		next();
	})
}

export default { user_status, user_roles, authenticate_token }