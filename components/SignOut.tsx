import { signOut } from '@/auth';
import { Button } from '@nextui-org/react';

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" className="" color="primary">
        Sign out
      </button>
    </form>
  );
}
export default SignOut;
