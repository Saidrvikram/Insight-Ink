// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiOutlineSearch } from 'react-icons/ai';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/userActions';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const handleSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem('token'); // Remove token from local storage if applicable
    navigate('/signin'); // Redirect to sign-in page
    console.log("User signed out"); // Optional: for debugging
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold">
          <Link to="/" className="text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Insight's
            </span>
            Ink
          </Link>
        </div>

        {/* Search Bar and Button */}
        <div className="flex flex-1 items-center mx-4 max-w-md space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
          />
          <Button className="h-10 w-12" color="gray" pill>
            <AiOutlineSearch />
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/aboutus" className="hover:text-blue-400">About Us</Link>
          <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        </div>

        {/* Sign In / User Dropdown */}
        <div>
          {currentUser ? (
            <Dropdown arrowIcon={false} inline label={
              <Avatar 
                alt='user'
                img={currentUser.profilePicture}
                rounded
              />
            }>
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
