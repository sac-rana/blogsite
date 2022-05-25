import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className='w-full fixed inset-x-0 bottom-0 z-10 p-3 flex justify-around text-xl bg-primary text-on-primary'>
      <Link href='/'>
        <a className='hover:text-secondary focus:text-secondary'>Home</a>
      </Link>
      <Link href='/write'>
        <a className='hover:text-secondary focus:text-secondary'>Write</a>
      </Link>
      <Link href='/account'>
        <a className='hover:text-secondary focus:text-secondary'>Account</a>
      </Link>
    </nav>
  );
}
