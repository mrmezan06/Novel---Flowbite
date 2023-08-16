const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, username, password, imageUrl } = req.body;

    // Check if user already exists
    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken!',
      });
    }

    // name, username, password is available or not
    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, username and password!',
      });
    }

    // Check password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long, contain at least 1 number, 1 lowercase and 1 uppercase letter!',
      });
    }

    if (!imageUrl) {
      delete req.body.imageUrl;
    }

    const user = await User.create({
      name,
      username,
      password,
      imageUrl: imageUrl ? imageUrl : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/user/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User does not exist!',
    });
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Incorrect password!',
    });
  }

  // TODO: Changed to process.env.ACCESS_TOKEN_SECRET
  // TODO: Changed to process.env.ACCESS_TOKEN_LIFE
  // Create access token with user and role
  const accessToken = jwt.sign(
    { userId: user._id, username: user.username, roles: user.roles },
    process.env.ACCESSTOKENSECRET,
    {
      expiresIn: process.env.ACCESSTOKENLIFE,
    }
  );

  user.accessToken = accessToken;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    user,
  });
};

// @desc    Logout user
// @route   POST /api/user/logout
// @access  Private
const logoutUser = async (req, res) => {
  
  const user = await User.findById(req.user.userId);
  // console.log(req.user);

  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'User does not exist!',
    });
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
    accessToken: null,
  });

  if (!updatedUser) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  }



  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
