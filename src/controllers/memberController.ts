import { Request, Response, NextFunction } from 'express';
import { MemberRepository } from '../repository';
import { Member, UpdateMember } from '../DTOs';

class MemberController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const memberData = Member.parse(req.body);

      const existingMember = await MemberRepository.findByEmail(memberData.email);

      if (existingMember) {
        return next({
          status: 400,
          message: 'Este e-mail já está registrado, tente novamente',
        });
      }
       
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;

      const member = await MemberRepository.findById(memberId);

      if (!member) {
        return next({
          status: 404,
          message: 'Membro não encontrado',
        });
      }

      res.locals = {
        status: 200,
        data: member,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;
      const memberData = UpdateMember.parse(req.body);

      const updatedMember = await MemberRepository.update(memberId, memberData);

      res.locals = {
        status: 200,
        data: updatedMember,
        message: 'Membro atualizado',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;

      await MemberRepository.delete(memberId);

      res.locals = {
        status: 200,
        message: 'Membro deletado',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new  MemberController();
