import express from 'express'

import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req:express.Request,res:express.Response) =>{
    try {
      const {email,password,username} = req.body;
      if(!email || !password || !username){
        return res.status(400)
      }
      const existUser = await getUserByEmail(email);

      if(existUser){
        return res.status(400).json("Email is already registered")
      }
      const salt = random();
      const user = await createUser({
        email,
        username,
        authentication:{
            salt,
            password:authentication(salt,password),
        }
      })
      return res.status(200).json(user).end() 
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}