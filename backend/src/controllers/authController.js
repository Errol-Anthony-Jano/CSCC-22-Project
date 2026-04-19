import bcrypt from "bcryptjs";
import models from "../config/db";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

//temp only
let refreshTokens = [];

export const loginUser = async (req, res) => {
  try {
    const {username, password, user_id} = req.body;

    const user = await models.users.findOne({
      where: {
        username: username,
        user_id: user_id,
        is_active: true
      }
    });
    if(!user) {
      return res.status(404).json({error: 'Active user not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: 'Wrong password'})
    }

    const payload = {
      user_id: user.user_id,
      username: user.username,
      is_admin: user.is_admin
    }

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //temp
    refreshTokens.push(refreshToken);

    res.status(200).json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,
      is_admin: user.is_admin,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

export const refreshToken = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken){
    return res.sendStatus(401);
  } 
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const payload = {
        user_id: user.user_id,
        username: user.username,
        is_admin: user.is_admin
      };

      const newAccessToken = generateAccessToken(payload);
      res.json({accessToken: accessToken});
  })
}

export const logoutUser = (req, res) => {
  const tokens = req.body.token;

  if (!token) {
    return res.status(400).json({error: "no token"})
  }

  refreshTokens = refreshTokens.filter(token => token !== tokens);

  res.sendStatus(204);
}