'use server'
import { createPostSchema, validateWithZodSchema } from "@/utils/schemas";
import { getAuthUserId } from "./authActions";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

const renderError = (error:unknown):{message:string}=>{
    return {message:error instanceof Error ? error.message : "An error occurred"}
}
export const createPostAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
   try {
    const userId = await getAuthUserId()
    if(!userId) return {message:'Unauthorize'}

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(createPostSchema,rawData)
    console.log(validatedFields);
    await prisma.post.create({
        data:{
            ...validatedFields,
            userId: userId
        }
    })
    revalidatePath('/posts')
   } catch (error) {
    console.log(error);
    renderError(error)
    
   }
   return {message:'Post was created successfully'}
  };


  
  export const fetchAllPosts = async ({ search = '' }: { search?: string }) => {
    try {
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { post: { contains: search, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          post: true,
          userId: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  


  export const fetchUsersPosts = async () => {
    const userId = await getAuthUserId()
    const posts = await prisma.post.findMany({
      where:{
        userId:userId
      },
      include:{
        user:{
          select:{
            name: true
          }
        }
      }
    });
    return posts;
  };


  export const fetchPostDetails = async (id: string) => {
    try {
      const post = await prisma.post.findUnique({
        where: { id }, // Ensure that this is hitting the correct unique ID field
        include: { user: true }, // Fetch associated user if needed
      });
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  };


  export const deletePostAction = async (prevState: { postId: string }): Promise<{ message: string }> => {
    const { postId } = prevState;
    const userId = await getAuthUserId();
    try {
      // Attempt to delete the post
      await prisma.post.delete({
        where: { 
          id: postId,
          userId: userId
        },
      });
 
      // Return a success message if deletion was successful
      revalidatePath('/posts')
      return { message: 'Post successfully deleted' };
    } catch (error) {
      // Log the error and return an error message
      console.error('Error deleting post:', error);
      return { message: 'Failed to delete the post' };
    }
  };


  export const updatePostAction = async (prevState: any, formData: FormData):Promise<{message:string}>=>{

    const postId = formData.get('id') as string
    const userId = await getAuthUserId()
    try {
      const rawData = Object.fromEntries(formData)
      const validatedFields = validateWithZodSchema(createPostSchema,rawData)
      await prisma.post.update({
        where:{
          id:postId,
          userId:userId
        },
        data:{
          ...validatedFields
        }
      });
      revalidatePath(`/posts/edit/${postId}`)
      return {message:'Updated successfully'}
      
    } catch (error) {
      return renderError(error)
    }
  }