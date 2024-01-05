import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false); // New state for loading
  const handleGoogleClick = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('https://vibe-vault-backend-git-main-piyushk2000.vercel.app/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      setIsLoading(false)
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not login with google', error);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className=" items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <button
          type='button'
          onClick={handleGoogleClick}
          className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
        >
          Continue with google
        </button>)}

    </>
  );
}
