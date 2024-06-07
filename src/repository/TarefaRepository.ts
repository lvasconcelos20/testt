import { Prisma, Tarefa } from '@prisma/client';
import prisma from '../database';

class TarefaRepository {
  async create(data: Prisma.TarefaCreateInput): Promise<Tarefa> {
    if (data.finalizada && typeof data.data_termino === 'string') {
      data.data_termino = new Date(data.data_termino).toISOString();
    } else if (data.finalizada && !data.data_termino) {
      throw new Error('Data de término é obrigatória para tarefas finalizadas');
    }

    return await prisma.tarefa.create({
      data: {
        name: data.name,
        descricao: data.descricao,
        finalizada: data.finalizada,
        data_termino: data.data_termino,
        prioridade: data.prioridade,
        membroId: memberid,
      },
    });
  }

  async findTarefaById(id: number): Promise<Tarefa | null> {
    return await prisma.tarefa.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.TarefaUpdateInput): Promise<Tarefa> {
    if (data.finalizada && typeof data.data_termino === 'string') {
      data.data_termino = new Date(data.data_termino).toISOString();
    } else if (data.finalizada && !data.data_termino) {
      throw new Error('Data de término é obrigatória para tarefas finalizadas');
    }

    return await prisma.tarefa.update({
      where: { id },
      data: {
        name: data.name,
        descricao: data.descricao,
        finalizada: data.finalizada,
        data_termino: data.data_termino,
        prioridade: data.prioridade,
        membro: {
          connect: { id: data.membro }, // Ajustando para conectar o membro corretamente
        },
      },
    });
  }

  async delete(id: number): Promise<Tarefa> {
    return await prisma.tarefa.delete({
      where: { id },
    });
  }

  async findTarefaByName(name: string): Promise<Tarefa | null> {
    return await prisma.tarefa.findFirst({
      where: { name },
    });
  }

  async findAll(): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany();
  }

  async getTarefasByMemberId(membroId: number): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany({
      where: { membroId: membroId },
    });
  }
}

export default new TarefaRepository();
