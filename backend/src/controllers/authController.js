import bcrypt from "bcryptjs";
import models from "../config/db";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

//temp only
//let refreshTokens = [];

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
      return res.status(404).json({error: 'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: 'Invalid credentials'})
    }

    const payload = {
      user_id: user.user_id,
      username: user.username,
      is_admin: user.is_admin
    }

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //temp
    //refreshTokens.push(refreshToken);
    const hash = await bcrypt.hash(refreshToken, 10);

    //new
    await models.refresh_tokens.create({
      user_id: user.user_id,
      token_hash: hash
    });
    res.cookie*("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict"
    });

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
  const token = req.cookies.refreshToken; //new

  if (!token){
    return res.sendStatus(401);
  } 

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      //new
      const tokens = await models.refresh_tokens.findAll({
        where: {
          user_id: user.user_id
        }
      });

      let found = null;

      for (const t of tokens){
        const match = await bcrypt.compare(token, t.token_hash);
        if (match){
          found = t;
          break;
        }
      }

      if (!found) {
        return res.sendStatus(403);
      }
       await found.destroy();


      const payload = {
        user_id: user.user_id,
        username: user.username,
        is_admin: user.is_admin
      };

      const newAccessToken = generateAccessToken(payload);
      const newRefreshToken = generateRefreshToken(payload);
      const newHash = await bcrypt.hash(newRefreshToken, 10);

      await models.refresh_tokens.create({
        user_id: user.user_id,
        token_hash: newHash
      });

      res.cookie*("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
      });

      res.json({accessToken: accessToken});
  })
}

export const logoutUser = (req, res) => {
  const tokens = req.body.token;

  if (!token) {
    return res.status(400).json({error: "no token"})
  }

  //new
  const tokens = await models.refresh_tokens.findAll();

  for (const t of tokens){
    const match = await bcrypt.compare(token, t.token_hash);
    if (match){
      await t.destroy();
      break;
    }
  }

  //refreshTokens = refreshTokens.filter(token => token !== tokens);
  res.clearCookie("refreshToken");

  res.sendStatus(204);
}