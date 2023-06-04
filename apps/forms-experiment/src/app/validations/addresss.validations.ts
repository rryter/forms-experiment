import { z } from 'zod';

export const AddressForm = z.object({
  street: z.string().nonempty(),
});

export type UserFormType = z.infer<typeof AddressForm>;
