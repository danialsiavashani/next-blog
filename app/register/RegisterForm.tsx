'use client';
import { registerUserAction } from '@/app/actions/authActions';

import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import Image from 'next/image';
import RegisterImage from '@/assets/register.svg';
export default function RegisterForm() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-8  grid lg:grid-cols-[1fr,600px] items-center gap-8">
        <div className="text-center lg:text-left">
          <h1 className="capitalize text-3xl md:text-4xl font-extrabold mb-3">
            next <span className="text-primary">blogging</span> App
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-4">
            Stay on top of your blog applications and streamline your blog
            search with our easy-to-use blogging tool.
          </p>
        </div>

        <div className="bg-white shadow-lg border p-6 rounded-lg w-full max-w-lg mx-auto lg:mx-0">
          <FormContainer action={registerUserAction}>
            <FormInput
              type="text"
              name="name"
              label="Name"
              defaultValue="danial"
            />
            <FormInput
              type="email"
              name="email"
              label="Email"
              defaultValue="danialsiavashani@yahoo.com"
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              defaultValue="202122danial@A~"
            />
            <SubmitButton
              text="Register"
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
            />
          </FormContainer>
        </div>
      </section>
      <Image src={RegisterImage} alt="landing" className="hidden lg:block" />
    </>
  );
}
