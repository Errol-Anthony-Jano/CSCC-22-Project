import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
  })
}

export const requreAdmin = (req, res, next) => {
  if (!req.user.is_admin){
    return res.status(403).json({
      error:"Unauthorized. Admin only"
    })
  }
  next();
}