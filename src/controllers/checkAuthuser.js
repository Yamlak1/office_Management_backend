const checkAuthuser = (req, res, next) => {
    // Check if the role cookie exists to know if someone is logged in
    if (!req.cookies.role) {
      return res.status(401).send({ message: "Login required" });
    }
  
    
    next();
  };
  
  module.exports = { checkAuthuser };
  