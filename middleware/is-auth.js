const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  // console.log(token)
  if(token !== "null"){
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, config.secret);
      // console.log(decodedToken)
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.id;

    next();

  }else{
    return res.status(401).json({
      status: "FAILED",
      message: "NOT AUTHENTICATED"
    })
  }
};
