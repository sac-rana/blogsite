import { useContext, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import dynamic from 'next/dynamic';
import { AppContext } from './_app';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>('');
  const { user } = useContext(AppContext);
  if (!user) throw new Error('You are not logged in');

  const uploadBlog = async () => {
    if (!content || content.length < 100) return;
    await addDoc(collection(firestore, 'blogs'), {
      authorId: user.uid,
      title,
      content,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <MDEditor
        value={content}
        onChange={setContent}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <button
        className='bg-primary text-on-primary font-bold py-1 px-3 rounded-lg m-5'
        onClick={uploadBlog}
      >
        Upload Blog
      </button>

      <button
        className='bg-primary text-on-primary font-bold py-1 px-3 rounded-lg m-5'
        onClick={() => setContent('')}
      >
        Reset
      </button>
    </div>
  );
}
