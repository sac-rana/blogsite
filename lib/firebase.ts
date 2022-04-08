import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  DocumentData,
  getFirestore,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
});

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export type Blog = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: Timestamp;
};

export const blogConvertor = (
  snaphot: DocumentSnapshot<DocumentData>,
): Blog => {
  const data = snaphot.data()!;
  return {
    id: snaphot.id,
    authorId: data.authorId,
    title: data.title,
    content: data.content,
    createdAt: new Timestamp(
      data.createdAt.seconds,
      data.createdAt.nanoseconds,
    ),
  };
};
