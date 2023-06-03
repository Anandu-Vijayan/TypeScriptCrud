import express from "express";

import { deleteById, getUser, getUserById } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUser();

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteById(id);
    return res.status(200).json({ deletedUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
export const upadateUser = async(req:express.Request,res:express.Response)=>{
    try {
        const {id} = req.params;
        const {username} = req.body;
        if(!username){
            return res.status(500).json("Please Enter username")
        }
        const  user = await getUserById(id);
        user.username = username;
        await user.save();

        return res.status(200).json("Sucess fully Updated")
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      }
}
