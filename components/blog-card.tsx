import { Blog, firestore } from '../lib/firebase';
import { doc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

const BlogCard = ({
  blog: { id, authorId, title, content, createdAt },
}: {
  blog: Blog;
}) => {
  const docRef = doc(firestore, 'authors', authorId);
  const [author, loading, error] = useDocumentDataOnce(docRef);
  if (!author) return <div>Loading...</div>;
  return (
    <div>
      <h1>{author.name}</h1>
      <h1>{title}</h1>
    </div>
  );
};

export default BlogCard;
