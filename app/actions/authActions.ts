'use server'

import { signIn, signOut, auth } from "@/auth";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { validateWithZodSchema,registerSchema,loginSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";



const renderError = (error:unknown):{message:string}=>{
    return {message:error instanceof Error ? error.message : "An error occurred"}
}


export async function signOutUser (){
    await signOut({redirectTo:'/'})
}



export async function getUserByEmail(email:string) {
    return prisma.user.findUnique({
        where:{
            email
        }
    })
}

export async function getUserById(id:string) {
    return prisma.user.findUnique({
        where:{
            id
        }
    })
}


export async function getAuthUserId (){
    const session = await auth()
    const userId = session?.user?.id

    if(!userId) throw new Error('Unauthorized');

    return userId
}


export const registerUserAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
    try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(registerSchema, rawData);
      const { name, email, password } = validatedFields;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedFields.email as string},
      });
      console.log(existingUser);
      
  
      if (existingUser) {
        return { message: 'User already exists' };
      }
  
      // Create new user
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
        },
      });
      return { message: 'User created successfully' };
      // After successful registration, redirect to the login page
      redirect('/login');
      
      // After redirection, return to stop any further execution (not necessary but good practice)
     
  
    } catch (error) {
      // Handle errors and return a message
      return renderError(error); // Ensure renderError returns a { message: string } object
    }
  };
  

  export const signInUserAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
    try {
      const rawData = Object.fromEntries(formData);
      
      // Here you can validate form data with Zod or any other schema
      const validatedFields = validateWithZodSchema(loginSchema, rawData);
      const { email, password } = validatedFields;
  
      // Perform sign in
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });
  
      if (!result || result.error ) {
        return { message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      if(error instanceof AuthError){
          switch (error.type) {
              case 'CredentialsSignin':
                  return{message: 'Invalid Credentials'}
              default:
                  return{message: 'Something went wrong'}
          }
      } else {
          return{message: 'Something else went wrong'}
      } 
    }
      redirect('/');
  };
  