import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";


export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authToken = req.headers.authorization
        if(!authToken) {
            return res.status(401).json({ error: 'Unauthorized'})
        }
        const [, token ] = authToken.split(' ')

        jwt.verify(token, process.env.JWT_SECRET as string)
        next()
    } catch (err){
        next(err)
    }
    

}
   