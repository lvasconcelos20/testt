import { z } from 'zod';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export const Tarefa = z.object({
  name: z
    .string({
      invalid_type_error: 'O nome deve ser uma string',
      required_error: 'O nome é obrigatório',
    })
    .min(5, { message: 'O nome deve ter pelo menos 5 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),

  descricao: z
    .string({
      message: 'Essa descrição deve ter no máximo 140 caracteres',
    }),

  finalizada: z.boolean().default(false),

  data_termino: z.date().optional()
  .transform((value) => (value ? formatDate(value) : undefined))
   .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'A data deve estar no formato 0000-00-00',
    }),
  prioridade: z.enum(['baixa', 'media', 'alta']).default('baixa'), 
});





export const UpdateTarefa = Tarefa.partial();