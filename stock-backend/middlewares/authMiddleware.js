const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log("token line 5", token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log("line 11 decoded token", decoded);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    console.log("line 11 decoded token", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
