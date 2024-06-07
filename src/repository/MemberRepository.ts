import { Prisma, Member } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Isso deve ser inicializado em algum ponto do seu aplicativo.

class MemberRepository {
  async create(data: Prisma.MemberCreateInput): Promise<Member> {
    return await prisma.member.create({ data });
  }

  async findUnique(where: Prisma.MemberWhereUniqueInput): Promise<Member | null> {
    return await prisma.member.findUnique({ where });
  }

  async update(id: string, data: Prisma.MemberUpdateInput): Promise<Member> {
    return await prisma.member.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Member> {
    return await prisma.member.delete({ where: { id } });
  }

  async findAll(): Promise<Member[]> {
    return await prisma.member.findMany();
  }
}

export default new MemberRepository();
