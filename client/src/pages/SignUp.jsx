import React, { useState } from 'react';
import { Button, Label, Spinner, TextInput, Alert, Checkbox } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Initialize navigate for redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('All fields are required');
      setLoading(false);
      return;
    }

    // Check if the email ends with @gmail.com
    if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
      setErrorMessage('Email must be a Gmail address (ending with @gmail.com)');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Success message
      setSuccessMessage('Signup successful! Redirecting to login...');
      setLoading(false);

      // Delay navigation so user sees the success message
      setTimeout(() => {
        navigate('/signin');
      }, 3000); // 3-second delay before redirect

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            Join us and explore the world of creativity.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                required
              />
            </div>

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

            {/* Confirm Password Input */}
            <div>
              <Label value="Confirm password" />
              <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                id="confirmPassword"
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

            {/* Submit Button */}
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <OAuth/>
          </form>

          {/* Sign In Link */}
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}

          {/* Success Message */}
          {successMessage && (
            <Alert className="mt-5" color="success">
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
