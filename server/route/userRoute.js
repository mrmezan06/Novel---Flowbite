const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controller/userController');
const { checkAuth, checkRole } = require('../utils/checkAuth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', checkAuth, logoutUser);

// Test CheckAuth && CheckRole

router.get('/test/admin', checkAuth, checkRole('ADMIN'), (req, res) => {
  res.json({
    success: true,
    message: 'You are an Admin!',
  });
});

router.get('/test/user', checkAuth, checkRole('USER'), (req, res) => {
  res.json({
    success: true,
    message: 'You are a User!',
  });
});

module.exports = router;
