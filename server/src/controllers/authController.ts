
import { Request, Response, NextFunction } from "express";
import { MemberRepository } from "../repository";
import jwt from "jsonwebtoken"


class AuthController {
    async login(req: Request, res: Response, next: NextFunction){
        try{
            
            const { email, password} = req.body;

            const member = await MemberRepository.findByEmail(email)

            if(!member) {
                return res.status(400).json({error: 'Membro não encontrado'})
            }

            if (password !== member.password){
                return res.status(401).json({error:'Senha Incorreta'})
            }

            const accesToken = jwt.sign({ id: member.id}, process.env.JWT_SECRET as string, {
                expiresIn: '30s',
            })
            const refreshToken = jwt.sign({id: member.id}, process.env.JWT_REFRESH_SECRET as string, {
                expiresIn: '1d'
            })
            
            req.cookies('refresh_token', refreshToken, {
                httpOnly: true,
            })

            return res.status(200).json({ accesToken})

        }catch(err){
            next(err)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refresh_token

            if(!refreshToken){
                return res.status(401).json({ error: 'Unauthorized'})
             } 

             const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as jwt.JwtPayload

             if(!decodedToken) {
                delete req.headers.authorization;
                return res.status(401).json({ error: 'Unauthorized'})
             }
            
             const member = await MemberRepository.findById(decodedToken.id)

             if (!member) {
                delete req.headers.authorization
                return res.status(401).json({ error: 'Unauthorized'})
             }

             const accesToken = jwt.sign({ id: decodedToken.id}, process.env.JWT_SECRET as string, {
                expiresIn: '30s'
             })

             const { password: _, ...memberData} = member

             return  res.status(200).json({ accesToken, memberData})

          

            }catch(err){
                return next(err)
            }
        }
    }



export default AuthController