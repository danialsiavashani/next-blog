'use client';
import { signInUserAction } from '@/app/actions/authActions';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import Image from 'next/image';
import LoginImage from '@/assets/login.svg';
export default function LoginForm() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-8  grid lg:grid-cols-[1fr,600px] items-center gap-8">
        <div className="text-center lg:text-left">
          <h1 className="capitalize text-3xl md:text-4xl font-extrabold mb-3">
            next <span className="text-primary">-auth</span> login
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-4">
            A secure login to your nex-blog app by next auth
          </p>
        </div>
        <div className="bg-white shadow-lg border p-6 rounded-lg w-full max-w-lg mx-auto lg:mx-0">
          <FormContainer action={signInUserAction}>
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
            <SubmitButton text="Login" className="mt-8 w-full " />
          </FormContainer>
        </div>
      </section>
      <Image
        src={LoginImage}
        alt="landing"
        className="hidden lg:block"
        width={400} // Set your desired width
        height={200} // Set your desired height
      />
    </>
  );
}
