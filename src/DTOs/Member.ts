import { z } from 'zod';

export const Member = z.object({
  id: z 
  .string ({

  }),
  name: z
  .string({
    invalid_type_error: 'O nome deve ser uma string',
    required_error: 'O nome é obrigatório',
  })
  .min(5, { message: 'O nome deve ter pelo menos 5 caracteres' }),
  email: z
  .string({
    required_error: 'O email é obrigatório',

  })
  .email({ message: 'Endereço de email inválido' }),

});

export const UpdateMember = Member.partial();