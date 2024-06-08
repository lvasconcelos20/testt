import { Request, Response, NextFunction } from 'express';
import { MemberRepository } from '../repository';
import { Member, UpdateMember } from '../DTOs';

class MemberController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const memberData = Member.parse(req.body);

      const existingMember = await MemberRepository.findByEmail(memberData.email);

      if (existingMember) {
        return res.status(400).json({
          message: 'Este e-mail já está registrado',
        });
      }

      const newMember = await MemberRepository.create(memberData);
      res.status(201).json(newMember);
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;

      const member = await MemberRepository.findById(Number(memberId));

      if (!member) {
        return next({
          status: 404,
          message: 'Membro não encontrado',
        });
      }

      res.status(200).json(member);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;
      const memberData = UpdateMember.parse(req.body);

      const updatedMember = await MemberRepository.update(Number(memberId), memberData);

      res.status(200).json({
        message: 'Membro atualizado',
        data: updatedMember,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;

      await MemberRepository.delete(Number(memberId));

      res.status(200).json({
        message: 'Membro deletado',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MemberController();
