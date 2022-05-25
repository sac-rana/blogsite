import { useContext, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import dynamic from 'next/dynamic';
import { AuthorContext, UserContext } from './_app';
import {
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { randomBytes } from 'crypto';
import slugify from 'slugify';
import BottomNav from '../components/bottom-nav';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function Write() {
  const alert = useAlert();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>('');
  const { user, loading } = useContext(UserContext);
  const { author, loading: authorLoading } = useContext(AuthorContext);
  const router = useRouter();
  if (loading || authorLoading) return <div>Loading...</div>;
  if (!user) return router.push('/');
  if (!author) return router.push('/account');

  const uploadBlog = async () => {
    if (!content || content.length < 400) {
      alert.error('Blog length must not be less than 400 characters.');
      return;
    }
    if (title.length < 5) {
      alert.error('Title length must not be less than 5 characters.');
      return;
    }
    const blogId = generateBlogId(title);
    await setDoc(doc(firestore, 'blogs', blogId), {
      authorId: user.uid,
      title,
      content,
      createdAt: serverTimestamp(),
    });
    await updateDoc(doc(firestore, 'authors', author.uid), {
      blogIds: arrayUnion(blogId),
    });
  };

  return (
    <main>
      <div className='p-8'>
        <label htmlFor='title' className='text-3xl font-bold mx-5'>
          Title
        </label>
        <input
          className='border-2 w-96 h-10 text-2xl'
          type='text'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <MDEditor
        value={content}
        onChange={setContent}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <p>{content?.length} characters</p>
      <div className='flex justify-around py-4'>
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
      <BottomNav />
    </main>
  );
}

function generateBlogId(blogTitle: string) {
  return slugify(blogTitle) + '-' + randomBytes(12).toString('hex');
}
