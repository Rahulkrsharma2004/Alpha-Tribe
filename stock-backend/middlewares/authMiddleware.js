const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  
  // const authHeader = req.header('Authorization');
  // const token = authHeader && authHeader.split(' ')[1];
  
  const token = req.cookies.token
  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    console.log("Decoded token:", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
