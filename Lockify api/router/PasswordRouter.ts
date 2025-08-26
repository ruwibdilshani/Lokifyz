import express from 'express';
import { Passwords } from '../module/Password';
import { add, update, deletePassword, getPasswords, getPasswordById } from '../db/prisma-password-store';

const router = express.Router();

router.post('/save-password', async (req, res) => {
    const password : Passwords = req.body
    try{
        const savedPassword = await add(password)
        console.log("password saved : " , savedPassword)
        res.status(201).json(savedPassword)
    } catch (error){
        console.log("error on save password : " , error)
        res.status(500).json(error)
    }
})



export default router;
