import { z } from 'zod';

export const UserForm = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  country22: z.string().nonempty().min(10),
});

export type UserFormType = z.infer<typeof UserForm>;
