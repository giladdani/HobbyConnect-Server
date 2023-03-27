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

async function create_admin_user(){
	let admin = {
		full_name: "admin",
		email: "admin@admin.com",
		id: new Date().getTime(),
		password: "admin",
		role: "admin",
		status: user_status.ACTIVE,
		posts: [],
		messages: []
	}
}

function authenticate_token(req:any, res:any, next:any){
	const token = req.headers['authorization'];
	if(token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err:any, data:any) => {
		if(err) return res.sendStatus(StatusCodes.UNAUTHORIZED)
		req.username = data.username;
		next();
	})
}

export default { user_status, user_roles, create_admin_user, authenticate_token }