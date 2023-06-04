import { z } from 'zod';

const Password = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  .regex(new RegExp('.*\\d.*'), 'One number')
  .regex(
    new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
    'One special character'
  )
  .min(8, 'Must be at least 8 characters in length');

export const PasswordForm = z
  .object({
    password: Password,
    confirmPassword: z.string().nonempty(),
  })
  .refine(
    (data) => {
      console.log(data);
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'], // path of error
    }
  );

export type PasswordFormType = z.infer<typeof PasswordForm>;
