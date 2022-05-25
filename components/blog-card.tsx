import { Blog } from '../lib/firebase';
import removeMD from 'remove-markdown';
import Link from 'next/link';

const BlogCard = ({
  blog: { id, authorId, title, content, createdAt },
}: {
  blog: Blog;
}) => {
  return (
    <Link href={`/blogs/${id}`}>
      <a>
        <div className='p-4 border-b-2 m-2 my-5 border-primary-variant w-1/2'>
          <div className='flex justify-between pb-4'>
            <h1 className='text-2xl font-bold'>
              {title} by {authorId} Date:{createdAt.toDate().toDateString()}
            </h1>
          </div>
          <p className='overflow-ellipsis'>
            {removeMD(content).substring(0, 150)}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;
