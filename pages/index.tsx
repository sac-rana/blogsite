import { collection, limit, orderBy, query } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useContext } from 'react';
import BottomNav from '../components/bottom-nav';
import Header from '../components/header';
import { blogConvertor, firestore } from '../lib/firebase';
import { AppContext } from './_app';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import BlogCard from '../components/blog-card';

const Home: NextPage = () => {
  const { user, loading } = useContext(AppContext);
  const q = query(collection(firestore, 'blogs'), limit(10));
  const [snapshot, blogsLoading, __] = useCollectionOnce(q);
  return (
    <div>
      <Header />
      <main>
        {blogsLoading && <h1>Loading...</h1>}
        {!blogsLoading &&
          snapshot!.docs.map(doc => {
            const blog = blogConvertor(doc);
            return <BlogCard key={blog.id} blog={blog} />;
          })}
      </main>
      {user && <BottomNav />}
    </div>
  );
};

export default Home;
