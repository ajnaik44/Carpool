const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Route: POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
console.log(password);
  try {
    // Find user by username in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
   const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    
    res.json({ token });
  } catch (error) {
	  console.error('login', error); 
    res.status(500).json({ message: 'Server error' });
  }
});



// Route: POST /api/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
console.error('registration',username);
console.error('registration',password);
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate the password is not empty
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10; // You can adjust the number of salt rounds as needed for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
