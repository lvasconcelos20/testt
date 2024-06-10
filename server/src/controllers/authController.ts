import { Request, Response, NextFunction } from "express";


class AuthController {
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const { email, password } = req.body;

            const user = await UserRepository.findByEmail(email);
       
            if (!user) {
              return next({
                status: 400,
                message: 'Invalid credentials.',
              });
            }
       
            const checkPassword = await compare(password, user.password);
       
            if (!checkPassword) {
              return next({
                status: 400,
                message: 'Invalid credentials.',
              });
            }
       
            const accessToken = TokenRepository.generateAccessToken(user.id, '60s');
            const refreshToken = TokenRepository.generateRefreshToken(user.id, '5d');
       
            CookieRepository.setCookie(res, 'refresh_token', refreshToken);
       
            const { password: _, ...loggedUser } = user;
       
            res.locals = {
              status: 200,
              message: 'User logged',
              data: {
                loggedUser,
                accessToken,
              },
            };

        }catch(err){
            next(err)
        }
    }

}


export default AuthController