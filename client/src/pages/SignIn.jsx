import React, { useState } from 'react';
import { Button, Label, Spinner, TextInput, Alert, Checkbox } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'; // Redux actions
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state using the correct slice name
  const { loading: isLoading, error } = useSelector((state) => state.user); // Ensure 'user' matches your slice name

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart()); // Dispatch start action

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle error from server
        dispatch(signInFailure(data.message || 'Failed to sign in'));
        return;
      }

      // On successful login
      dispatch(signInSuccess(data));
      navigate('/'); // Navigate to the homepage or dashboard

    } catch (error) {
      // Handle network or unexpected errors
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side: Logo */}
        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="font-bold dark:text-white text-5xl">
            <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Insight's
            </span>{' '}
            Ink
          </Link>
          <p className="text-lg mt-5">
            Welcome back! Sign in to access your account.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <Label value="Your password" />
              <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Show Password Checkbox */}
            <div className="flex items-center">
              <Checkbox
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <Label className="ml-2" htmlFor="showPassword">
                Show password
              </Label>
            </div>

            {/* Sign In Button */}
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth/>
          </form>

          {/* Sign Up Link */}
          <div className="flex gap-2 text-sm mt-5">
            <span>Don’t have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
