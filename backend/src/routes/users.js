import express from "express";
import bcrypt from "bcryptjs";

export const usersRouter = express.Router();

import models from "../config/db.js";

//add checking if current user is an admin for adding and deleting

// -> login 
usersRouter.post('/login', async (req, res) => {
  const {user_id, username, password} = req.body;
  if (!user_id || !username || !password){
    return res.status(400).json({error: "Should input in all fields"})
  }

  try{
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

    res.status(200).json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,
      is_admin: user.is_admin,
    })
  }catch(error){
    res.status(500).json({error: error.message})
  }
})

// -> add user
usersRouter.post('/', async (req, res) => {
  const {username, role, password, confirmPassword} = req.body;
  let isAdmin = false;

  if (!username || !role || !password || !confirmPassword){
    return res.status(400).json({error: "Should input in all fields"})
  }
  if (password.length < 8){
    return res.status(400).json({error: 'Password should be eight or more characters'})
  } 
  if (!(password === confirmPassword)){
    return res.status(400).json({error: 'Passwords should match'})
  }
  if (role.toLowerCase() === "admin"){
      isAdmin = true;
    }

  try {
    const existingUser = await models.users.findOne({
      where: {
        username: username,
        is_active: true
      }
    })
    if (existingUser){
      return res.status(409).json({error: 'Username already exists'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const addedUser = await models.users.create({
      username: username,
      password: hashedPassword,
      is_admin: isAdmin,
      is_active: true
    })

    res.status(201).json({
      message: "Adding user successful",
      user_id: addedUser.user_id,
      username: addedUser.username,
      is_admin: addedUser.is_admin
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
})

// -> remove(archive) user
usersRouter.delete('/:user_id', async (req,res) => {
  try{
    const [archivedUsers] = await models.users.update(
      { is_active: false},
      { where: 
        { user_id: req.params.user_id,
          is_active: true
        }
      })
      if(archivedUsers === 0){
        return res.status(404).json({error: "User not found"})
      }
    res.status(200).json({message: "User removed"})
  } catch(error){
    res.status(500).json({error: error.message})
  }
})