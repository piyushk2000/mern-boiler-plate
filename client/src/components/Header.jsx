import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-left max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold -ml-10'>Vibe vault</h1>
        </Link>
        <Link to='/vibematch'>
          <h1 className='font-bold -ml-60'>Vibe Match</h1>
        </Link>
        <ul className='flex gap-4'>
          {/* <Link to='/'>
            <li>Vibe</li>
          </Link> */}
          {/* <Link to='/vibematch'>
            <li>Vibe Match</li>
          </Link> */}
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
