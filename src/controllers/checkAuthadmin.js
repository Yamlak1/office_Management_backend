




const checkAuthadmin = (req, res, next) => {
    // Check if the role cookie exists
    if (!req.cookies.role) {
      return res.status(401).send({ message: "Login required" });
    }
  
    if (req.cookies.role !== 'admin') {
      return res.status(403).send({ message: "Admin access required" });
    }
  
   
    next();
  };
  
  module.exports = { checkAuthadmin };
  