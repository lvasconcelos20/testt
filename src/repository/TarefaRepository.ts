import { PrismaClient, Prisma, Tarefa } from '@prisma/client';

const prisma = new PrismaClient();

class TarefaRepository {
  // Cria uma nova tarefa
  async create(data: Prisma.TarefaCreateInput): Promise<Tarefa> {
    return await prisma.tarefa.create({ data });
  }

  // Atualiza uma tarefa existente
  async update(id: number, data: Prisma.TarefaUpdateInput): Promise<Tarefa> {
    return await prisma.tarefa.update({ where: { id }, data });
  }

  // Finaliza uma tarefa e registra a data de término
  async finalizar(id: number): Promise<Tarefa> {
    return await prisma.tarefa.update({
      where: { id },
      data: {
        finalizada: true,
        data_termino: new Date(), // Registra a data e hora atual
      },
    });
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
