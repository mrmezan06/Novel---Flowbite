const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization || req.headers.Authorization;
    // console.log(token);

    if (token) {
      // TODO: Changed to process.env.ACCESS_TOKEN_SECRET
      const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET);

      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const { roles } = req.user;

    const userRoles = roles.map((role) => ROLES[role]);

    const hasRole = userRoles.some((role) => allowedRoles.includes(role));

    if (hasRole) {
      return next();
    }

    return res.status(401).json({
      success: false,
      message: 'You are not authorized to access this route!',
    });
  };
};

module.exports = { checkAuth, checkRole };
