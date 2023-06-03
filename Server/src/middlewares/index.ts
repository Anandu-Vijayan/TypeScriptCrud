import express from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../db/users'; 

export const isOwner = async (req:express.Request,res:express.Response,next:express.NextFunction) =>{
    try {
      const { id } = req.params; 
      const currentUserId = get(req,'identity._id') as string;

      if(!currentUserId){
        return res.status(400).json("Sorry you didn't have authorsisation")
      }
      if(currentUserId.toString() !== id){
        return res.status(400).json("Sorry you didn't have authorsisation")
      }
      next()
    } catch (error) {
        console.log(error);
    return res.status(500).json({error:error.message}); 
    }
}



export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['ANANDU'];

    if (!sessionToken) {
      return res.status(500).json("Please Login");
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(500).json("Session Expaired Please Relogin");
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:error.message});
  }
}