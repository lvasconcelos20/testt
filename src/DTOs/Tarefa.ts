import { z } from 'zod';
import prisma from '../database';

export const Tarefa = z.object({
  name: z
    .string({
      invalid_type_error: 'O nome deve ser uma string',
      required_error: 'O nome é obrigatório',
    })
    .min(5, { message: 'O nome deve ter pelo menos 5 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),

  descrição: z
    .string({
      message: 'Essa descrição deve ter no máximo 140 caracteres',
    }),

  finalizada: z.boolean().default(false),

  data_termino: z.date({
    invalid_type_error: "A data de início deve ser um objeto de data válida",
    required_error: "A data de início é obrigatória",
  }),
  prioridade: z.enum(['baixa', 'media', 'alta']).default('baixa'), 
});

export const finalizarTarefa = async (tarefaId: number) => {
    try {
      // Atualiza a tarefa como finalizada e registra a data e hora de conclusão
      const tarefaAtualizada = await prisma.tarefa.update({
        where: { id: tarefaId },
        data: {
          finalizada: true,
          data_termino: new Date(), // Registra a data e hora atual
        },
      });
  
      console.log("Tarefa finalizada e persistida no banco de dados:", tarefaAtualizada);
  
    } catch (error) {
      console.error("Erro ao finalizar tarefa:", error);
   
    }
  };



export const UpdateTarefa = Tarefa.partial();