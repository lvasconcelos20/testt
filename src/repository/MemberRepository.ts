import { PrismaClient, Prisma, Member } from '@prisma/client';

const prisma = new PrismaClient();

class MemberRepository {
  async create(data: Prisma.MemberCreateInput): Promise<Member> {
    return await prisma.member.create({ data });
  }

  async findByEmail(email: string): Promise<Member | null> {
    return await prisma.member.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<Member | null> {
    return await prisma.member.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.MemberUpdateInput): Promise<Member> {
    return await prisma.member.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Member> {
    return await prisma.member.delete({ where: { id } });
  }

  async findAll(): Promise<Member[]> {
    return await prisma.member.findMany();
  }
}

export default new MemberRepository();
