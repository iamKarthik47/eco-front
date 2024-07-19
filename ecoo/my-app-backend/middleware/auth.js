const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  console.log('Authenticating user session:', req.session);
  if (req.session && req.session.user && req.session.token) {
    try {
      const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log('User authenticated:', req.user);
      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      res.status(401).json({ message: 'Authentication failed. Please log in again.' });
    }
  } else {
    console.log('User not authenticated. Session:', req.session);
    res.status(401).json({ message: 'Authentication required. Please log in.' });
  }
};