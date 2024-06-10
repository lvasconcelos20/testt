import { z } from 'zod';

export const Member = z.object({
  id: z 
  .string ({
  }).optional(),
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
  password: z
  .string({ invalid_type_error: 'A senha deve ser uma string' })
  .min(3, { message: 'A senha deve ter no mínimo 3 caracteres' }),

});

export const UpdateMember = Member.partial();

