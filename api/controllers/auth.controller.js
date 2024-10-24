import User from '../models/user.model.js'; // Keep only one import
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Basic field validation
  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required to be filled'));
  }

  try {
    // Hashing the password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Creating a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Saving the new user in the database
    await newUser.save();
    res.status(201).json({ message: 'Signup was successful' });
  } catch (error) {
    console.error('Signup error:', error); // Log error for debugging
    next(error);
  }
};

// Signin controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Basic field validation
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Validate user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, 'User not found'));
    }

    // Check if the password matches
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Generate JWT token with expiration
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration

    // Exclude password from the response
    const { password: pass, ...rest } = validUser._doc;

    // Set the token in an HTTP-only cookie and respond with user data
    res.status(200)
      .cookie('access_token', token, {
        httpOnly: true, // Secure the cookie to be accessed only by the server
      })
      .json(rest);
  } catch (error) {
    console.error('Signin error:', error); // Log error for debugging
    next(error);
  }
};

// Google authentication controller
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // User exists, generate token and respond
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration
      const { password, ...rest } = user._doc;

      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    } else {
      // Create a new user
      const generatedPassword = Math.random().toString(36).slice(-8); // Generate a random password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().replace(/\s+/g, '') + Math.random().toString(36).slice(-4), // Improved username generation
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const { password, ...rest } = newUser._doc; // Exclude password from response

      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    console.error('Google sign-in error:', error); // Log error for debugging
    return res.status(500).json({ message: 'Internal server error' }); // Handle error response
  }
};
