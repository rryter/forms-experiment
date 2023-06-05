import { z } from 'zod';

export const UserForm = z.object({
  firstName: z.string().nonempty({ message: 'firstName is required' }),
  lastName: z.string().nonempty(),
});

export type UserFormType = z.infer<typeof UserForm>;
