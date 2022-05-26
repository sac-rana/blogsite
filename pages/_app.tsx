import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';
import Header from '../components/header';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { doc } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import {
  transitions,
  positions,
  Provider as AlertProvider,
  AlertOptions,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

interface UserContext {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

interface Author {
  uid: string;
  name: string | undefined;
  blogIds: string[];
  photo: string | undefined;
}

interface AuthorContext {
  author: Author | null;
  loading: boolean;
  error: Error | undefined;
}

export const UserContext = createContext<UserContext>({} as UserContext);
export const AuthorContext = createContext<AuthorContext>({} as AuthorContext);

const options: AlertOptions = {
  timeout: 1000,
  position: positions.TOP_CENTER,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  const [author, authorLoading, authorError] = useAuthor(user?.uid);
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <UserContext.Provider value={{ user, loading, error }}>
        <AuthorContext.Provider
          value={{ author, loading: authorLoading, error: authorError }}
        >
          <Header />
          <Component {...pageProps} />
        </AuthorContext.Provider>
      </UserContext.Provider>
    </AlertProvider>
  );
}

function useAuthor(uid?: string): [Author | null, boolean, Error | undefined] {
  const docRef = uid ? doc(firestore, 'authors', uid) : null;
  const [snapshot, loading, error] = useDocumentOnce(docRef);
  const author: Author | null = snapshot
    ? {
        uid: uid!,
        name: snapshot.get('name'),
        blogIds: snapshot.get('blogIds') as string[],
        photo: snapshot.get('photo'),
      }
    : null;
  return [author, loading, error];
}

export default MyApp;
