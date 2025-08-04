const User = require('../models/User');

const dummyUsers = [
  {
    name: 'Ayush Negi',
    email: 'ayush@example.com',
    referralCode: 'ayu2025',
    donations: 500,
    password: 'password123',
  },
  {
    name: 'Negi ',
    email: 'negi@example.com',
    referralCode: 'negi2025',
    donations: 400,
    password: 'password123',
  },
];

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findOne() || dummyUsers[0];
    res.status(200).json(user);
  } catch (err) {
    console.error('getUserData error:', err.message);
    res.status(200).json(dummyUsers[0]);
  }
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email }).catch(() => null);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const referralCode = `${name.toLowerCase().replace(/\s/g, '')}${new Date().getFullYear()}`;
    user = new User({
      name,
      email,
      referralCode,
      password, 
      donations: 0,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(201).json({ message: 'User created successfully (dummy mode)' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).catch(() => null);
    if (!user) {
      // Check dummy users
      const dummyUser = dummyUsers.find(u => u.email === email);
      if (!dummyUser || dummyUser.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({
        message: 'Login successful (dummy mode)',
        user: { name: dummyUser.name, referralCode: dummyUser.referralCode, donations: dummyUser.donations },
      });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, referralCode: user.referralCode, donations: user.donations },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};