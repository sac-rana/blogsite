import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '../lib/firebase';

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
};

export default function SignIn() {
  return (
    <main>
      <div className='text-center'>
        <h1 className='text-4xl'>Log In</h1>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </main>
  );
}
