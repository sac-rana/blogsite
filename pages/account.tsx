import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useAlert } from 'react-alert';
import { auth } from '../lib/firebase';
import { AuthorContext, UserContext } from './_app';
import Image from 'next/image';

export default function Account() {
  const { user, loading } = useContext(UserContext);
  const { author, loading: authorLoading } = useContext(AuthorContext);
  const [name, setName] = useState<string | undefined>(author?.name);
  const [editable, setEditable] = useState(false);
  const router = useRouter();
  const alert = useAlert();
  if (loading || authorLoading) return <div>Loading...</div>;
  if (!user || !author) return router.push('/signin');
  if (!author.name || !author.photo) alert.show('Complete your profile');
  return (
    <div>
      <button
        className=''
        onClick={() => {
          signOut(auth);
          router.push('/');
        }}
      >
        Sign Out
      </button>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={editable}
      />
      <p>
        Photo
        <Image src={author.photo ?? '/profile-photo.jpg'} alt='profile photo' />
      </p>
    </div>
  );
}
