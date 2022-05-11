import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { FirebaseError } from 'firebase/app';
import { useContext } from 'react';
import { AppContext } from '../pages/_app';
import Link from 'next/link';

const signIn = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.log(err.code);
    } else throw err;
  }
};

export default function Header() {
  const { user, loading } = useContext(AppContext);
  let Nav;
  if (loading) Nav = null;
  else if (!user) {
    Nav = (
      <div className='flex justify-around items-center'>
        <button className='p-2' onClick={signIn}>
          Sign In
        </button>
        <button className='p-2'>Get started</button>
      </div>
    );
  } else {
    Nav = (
      <div className='relative w-10 h-10'>
        <Image
          src={user.photoURL!}
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
