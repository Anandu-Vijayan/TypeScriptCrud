import  express from 'express'
import { isAuthenticated,isOwner } from '../middlewares/index';


import {deleteUser, getAllUsers, upadateUser} from '../controllers/users';

export default (router:express.Router) =>{
    router.get('/users',isAuthenticated,getAllUsers);
    router.patch('/users/:id',isAuthenticated,isOwner,upadateUser)
    router.delete('/users/:id',isAuthenticated,isOwner,deleteUser)
}
