import * as z from 'zod'
import { ZodSchema } from 'zod'




export const profileSchema = z.object({
    // firstName:z.string().max(5, {message: 'max length is 5'}),
    firstName : z.string().min(2,{message:"first name must be at least 2 characters"}),
    lastName : z.string().min(2,{message:"last name must be at least 2 characters"}),
    username : z.string().min(2,{message:"username must be at least 2 characters"}),
})



export function validateWithZodSchema<T>(schema:ZodSchema<T>,data:unknown):T{
    const result = schema.safeParse(data);
      if (!result.success) {
        const errors = result.error.errors.map((error) => error.message);
        throw new Error(errors.join(','));
      }
      return result.data;
}

export const loginSchema = z.object({
  email: z.string(),
  password: z.string()
})


export const registerSchema = z.object({
    name:z.string().min(3),
    email: z.string()
      .email({ message: "Must be a valid email address" })
      .regex(
        /@(yahoo|gmail|outlook|hotmail)\.com$/i, 
        { message: "Email must be a Yahoo, Gmail, or Outlook address" }
      ),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
  });


  export const createPostSchema = z.object({
    title:z.string().min(3),
    post:z.string().min(3),
  });
