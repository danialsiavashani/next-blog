import { fetchPostDetails, updatePostAction } from '@/app/actions/postActions';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { redirect } from 'next/navigation';
async function EditPost({ params }: { params: { id: string } }) {
  const post = await fetchPostDetails(params.id);
  if (!post) redirect('/');
  return (
    <>
      <FormContainer action={updatePostAction}>
        <input type="hidden" name="id" value={post.id} />
        <FormInput
          type="text"
          name="title"
          label="Title"
          defaultValue={post?.title}
        />
        <TextAreaInput name="post" labelText="Post" defaultValue={post?.post} />
        <SubmitButton text="Update" className="mt-8 w-full " />
      </FormContainer>
    </>
  );
}
export default EditPost;
