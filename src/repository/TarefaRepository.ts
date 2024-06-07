import { PrismaClient, Prisma, Tarefa } from '@prisma/client';

const prisma = new PrismaClient();

class TarefaRepository {
  [x: string]: any;
  // Cria uma nova tarefa
  async create(data: Prisma.TarefaCreateInput): Promise<Tarefa> {
    if (data.finalizada && !data.data_termino) {
      data.data_termino = new Date().toISOString();
    }

    return await prisma.tarefa.create({ data });
  }

  // Atualiza uma tarefa existente
  async update(id: number, data: Prisma.TarefaUpdateInput): Promise<Tarefa> {
    if (data.finalizada && !data.data_termino) {
      data.data_termino = new Date().toISOString();
    }

    return await prisma.tarefa.update({ where: { id }, data });
  }

  async findById(id: number): Promise<Tarefa | null> {
    return await prisma.tarefa.findUnique({ where: { id } });
  }

  // Deleta uma tarefa pelo ID
  async delete(id: number): Promise<Tarefa> {
    return await prisma.tarefa.delete({ where: { id } });
  }

  async findAll(): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany();
  }
}

export default new TarefaRepository();
