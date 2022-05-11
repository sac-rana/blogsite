import rehypeSanitize from 'rehype-sanitize';
import { blogConvertor, firestore } from '../../lib/firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

export default function BlogPage() {
  const router = useRouter();
  const { title_slug } = router.query;
  const docRef = doc(firestore, 'blogs', title_slug as string);
  const [snapshot, loading] = useDocumentOnce(docRef);
  if (loading) {
    return <h1>Loading</h1>;
  }
  const blog = blogConvertor(snapshot!);
  return (
    <main className='w-2/3 p-8'>
      <h1 className='text-5xl font-bold leading-relaxed mb-6'>{blog.title}</h1>
      <MDPreview
        style={{
          fontSize: '1.2em',
        }}
        source={blog.content}
        rehypePlugins={[[rehypeSanitize]]}
      />
    </main>
  );
}
