import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { promisify } from 'util'

export default async (req, res, next) => {
	const authHeader = req.headers.authorization

	console.log(authHeader)

	if(!authHeader){
		return res.status(401).json({ error: 'Token não fornecido' }) 
	}

	const [, token] = authHeader.split(' ') // separando a partir do espaço

	try{
		const decoded = await promisify(jwt.verify)(token, authConfig.secret)

		req.userId = decoded.id

		return next()
	}catch(err){
		return res.status(401).json({ error: 'Token invalido' }) 
	}

	return next()
}