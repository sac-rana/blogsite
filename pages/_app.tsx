import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, Author } from '../lib/firebase';
import Header from '../components/header';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface Context {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const AppContext = createContext<Context>({} as Context);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  return (
    <AppContext.Provider value={{ user, loading, error }}>
      <Header />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
