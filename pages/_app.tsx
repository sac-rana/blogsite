import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface Context {
  user: User | null | undefined;
  loading: boolean;
}
export const AppContext = createContext<Context>({} as Context);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  if (error) throw error;
  return (
    <AppContext.Provider value={{ user, loading }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
export default MyApp;
