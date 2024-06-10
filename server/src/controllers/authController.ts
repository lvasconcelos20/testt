import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MemberRepository } from "../repository";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const member = await MemberRepository.findByEmail(email);

            if (!member) {
                return res.status(400).json({ error: 'Membro não encontrado' });
            }

            const isPasswordValid = await bcrypt.compare(password, member.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha Incorreta' });
            }

            const accessToken = jwt.sign({ id: member.id }, process.env.JWT_SECRET as string, {
                expiresIn: '30s',
            });
            const refreshToken = jwt.sign({ id: member.id }, process.env.JWT_REFRESH_SECRET as string, {
                expiresIn: '1d'
            });

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',
            });

            return res.status(200).json({ accessToken });
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as jwt.JwtPayload;

            if (!decodedToken) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const member = await MemberRepository.findById(decodedToken.id);

            if (!member) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const accessToken = jwt.sign({ id: decodedToken.id }, process.env.JWT_SECRET as string, {
                expiresIn: '1d',
            });

            const { password: _, ...memberData } = member;

            return res.status(200).json({ accessToken, memberData });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
