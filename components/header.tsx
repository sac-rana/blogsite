import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../pages/_app';
import Link from 'next/link';

export default function Header() {
  const { user, loading } = useContext(UserContext);
  let Nav;
  if (loading) Nav = null;
  else if (!user) {
    Nav = (
      <div className='flex justify-around items-center'>
        <Link className='p-2' href={'/signin'}>
          Sign In
        </Link>
        <button className='p-2'>Get started</button>
      </div>
    );
  } else {
    Nav = (
      <div className='relative w-10 h-10'>
        <Image
          src={user.photoURL ?? '/profile-icon.jpg'}
          alt='Profile'
          layout='fill'
          className='rounded-full'
        />
      </div>
    );
  }
  return (
    <nav className='w-full flex justify-between items-center p-3 bg-primary text-on-primary text-xl'>
      <Link href={'/'}>
        <a>
          <div>
            <strong>Sachin Blog</strong>
          </div>
        </a>
      </Link>
      {Nav}
    </nav>
  );
}
