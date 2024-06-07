import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  // Aqui você pode ajustar como deseja tratar o erro (formatar e exibir ou logar)
  console.error(err.stack);

  // Formata o erro da resposta
  return res.status(500).json({
    message: 'Ocorreu um erro interno no servidor',
    error: err.message,
  });
};

export default errorMiddleware;