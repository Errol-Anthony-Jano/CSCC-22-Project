import express from "express";
import bcrypt from "bcryptjs";

export const usersRouter = express.Router();

import models from "../config/db.js";

//add/fix error handling
// -> login 
usersRouter.post('/login', async (req, res) => {
  const {user_id, username, password} = req.body;
  if (!user_id || !username || !password){
    return res.json({error: "should input in all fields"})
  }

  try{
    const user = await models.users.findOne({
      where: {
        username: username,
        user_id: user_id
      }
    });
    if(!user) {
      return res.json({error: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.json({message: 'wrong password'})
    }

    res.json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,
      is_admin: user.is_admin,
    })
  }catch(error){
    res.json({error: "error occured"})// will fix this
  }
})

// -> add user
usersRouter.post('/', async (req, res) => {
  const {username, role, password, confirmPassword} = req.body;
  let isAdmin = false;

  if (!username || !role || !password || !confirmPassword){
    return res.json({error: "should input in all fields"})
  }
  if (password.length < 8){
    return res.json({error: 'password should be eight or more characters'})
  } 
  if (!(password === confirmPassword)){
    return res.json({error: 'passwords should match'})
  }
  if (role.toLowerCase() === "admin"){
      isAdmin = true;
    }

  try {
    const existingUser = await models.users.findOne({
      where: {
        username: username
      }
    })
    if (existingUser){
      return res.json({error: 'username already exists'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const addedUser = await models.users.create({
      username: username,
      password: hashedPassword,
      is_admin: isAdmin
    })

    res.json({
      message: "adding user successful",
      user_id: addedUser.user_id,
      username: addedUser.username,
      is_admin: addedUser.is_admin
    })
  } catch(error){
    res.json({error: "error occured"})//will fix this
  }
})

// -> delete user (not archive?)
//just this for now
usersRouter.delete('/:user_id', async (req,res) => {
  try{
    const deleteUser = await models.users.destroy({
      where: {
        user_id: req.params.user_id
      }
    })
    res.json({message: "User deleted"})
  } catch(error){
    res.json({error: "error occured"})//will fix this
  }
})