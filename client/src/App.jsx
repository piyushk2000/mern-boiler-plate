import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AnimeDetails from './pages/animePage';
import VibeMatch from './pages/vibeMatch';
import MyVibe from './pages/myVibe';

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/vibematch" element={<VibeMatch />} />
          <Route path="/myvibe" element={<MyVibe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
