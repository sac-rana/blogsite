import { collection, limit, orderBy, query } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useContext } from 'react';
import BottomNav from '../components/bottom-nav';
import { blogConvertor, firestore } from '../lib/firebase';
import { UserContext } from './_app';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import BlogCard from '../components/blog-card';

const Home: NextPage = () => {
  const { user } = useContext(UserContext);
  const q = query(collection(firestore, 'blogs'), limit(10));
  const [snapshot, blogsLoading, error] = useCollectionOnce(q);
  if (error) throw error;
  return (
    <>
      <main>
        {blogsLoading && <h1>Loading...</h1>}
        {!blogsLoading &&
          snapshot!.docs.map(doc => {
            const blog = blogConvertor(doc);
            return <BlogCard key={blog.id} blog={blog} />;
          })}
      </main>
      {user && <BottomNav />}
    </>
  );
};

export default Home;
