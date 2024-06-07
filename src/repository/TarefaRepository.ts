import { Prisma, Tarefa } from '@prisma/client';
import prisma from '../database'


class TarefaRepository {

  async create(data: Prisma.TarefaCreateInput): Promise<Tarefa> {
    if (data.finalizada && typeof data.data_termino === 'string') {
      data.data_termino = new Date(data.data_termino).toISOString();
    } else if (data.finalizada && !data.data_termino) {
      throw new Error('Data de término é obrigatória para tarefas finalizadas');
    }

    return await prisma.tarefa.create({ data });
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

    return await prisma.tarefa.update({ where: { id }, data });
  }


  // Deleta uma tarefa pelo ID
  async delete(id: number): Promise<Tarefa> {
    return await prisma.tarefa.delete({
      where: { id }
    });
  }

  async findTarefaByName(name: string): Promise<Tarefa | null> {
    const tarefa = await prisma.tarefa.findFirst({ where: { name } });
    return tarefa;
  }

  async findAll(): Promise<Tarefa[]> {
    const tarefas = await prisma.tarefa.findMany();
    return tarefas.map(tarefa => ({
      ...tarefa,
      data_termino: tarefa.data_termino ? new Date(tarefa.data_termino).toISOString() : null,
    })) as Tarefa[];
  }
}
export default new TarefaRepository();
