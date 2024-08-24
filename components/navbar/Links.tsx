import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenu } from '../ui/dropdown-menu';
import { HiBars3 } from 'react-icons/hi2';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import Link from 'next/link';
import SignOut from '../SignOut';

async function Links() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 mx-w-[100px]">
          {session?.user?.name} <HiBars3 className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        {!session && (
          <>
            <DropdownMenuItem>
              <Link href="/login">
                <button className="w-full text-left">Login</button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/register">
                <button className="w-full text-left">Register</button>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {session && (
          <>
            <DropdownMenuItem>
              <Link href="/posts">
                <button className="w-full text-left">My Blog</button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about">
                <button className="w-full text-left">About</button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="bg-muted">
              <SignOut />
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default Links;
