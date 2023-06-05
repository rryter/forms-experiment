import { z } from 'zod';

export const UserForm = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

export type UserFormType = z.infer<typeof UserForm>;
