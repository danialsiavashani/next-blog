'use client';
import { createPostAction } from '@/app/actions/postActions';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import TextAreaInput from '@/components/form/TextAreaInput';

function CreatePost() {
  return (
    <>
      <FormContainer action={createPostAction}>
        <FormInput
          type="text"
          name="title"
          label="Title"
          defaultValue="Banana"
        />
        <TextAreaInput
          name="post"
          labelText="Post"
          defaultValue="The best fruit on earth is banana"
        />
        <SubmitButton text="Create" className="mt-8 w-full " />
      </FormContainer>
    </>
  );
}
export default CreatePost;
