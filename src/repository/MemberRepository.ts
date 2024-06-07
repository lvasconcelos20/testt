import { Prisma, Member } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

class MemberRepository {
  [x: string]: any;
  async create(data: Prisma.MemberCreateInput): Promise<Member> {
    return await prisma.member.create({ data });
  }

  async findUnique(where: Prisma.MemberWhereUniqueInput): Promise<Member | null> {
    return await prisma.member.findUnique({ where });
  }

  async update(id: string | number, data: Prisma.MemberUpdateInput): Promise<Member> {
    if (typeof id === 'string') {
      id = parseInt(id, 10); // Converte para number
    }

    return await prisma.member.update({ where: { id }, data });
  }

  async delete(id: string | number): Promise<Member> {
    if (typeof id === 'string') {
      id = parseInt(id, 10); // Converte para number
    }

    return await prisma.member.delete({ where: { id } });
  }

  async findAll(): Promise<Member[]> {
    return await prisma.member.findMany();
  }
}

export default new MemberRepository();
