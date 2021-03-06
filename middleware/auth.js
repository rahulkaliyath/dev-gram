const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {

    const token = req.header("auth-token");

    if(!token){
        res.status(401).json({msg:"No token. Authorisation denied"});
    }

    try{
      const decoded =  jwt.verify(token, config.get('jwtSecretKey'));

      req.user = decoded.user
      next();
    }
    catch(err){
        res.status(401).json({msg : 'Token is not valid'});

    }
}