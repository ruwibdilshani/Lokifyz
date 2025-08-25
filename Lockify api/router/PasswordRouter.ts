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

router.put('/update-password', async (req, res) => {
    const password : Passwords = req.body
    try{
        const updatedPassword = await update(password)
        console.log("password updated : " , updatedPassword)
        res.status(201).json(updatedPassword)
    } catch (error){
        console.log("error on update password : " , error)
        res.status(500).json(error)
    }
})

router.delete('/delete-password/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        const deletedPassword = await deletePassword(id)
        console.log("password deleted : " , deletedPassword)
        res.status(201).json(deletedPassword)
    } catch (error){
        console.log("error on delete password : " , error)
        res.status(500).json(error)
    }
})

router.get('/get-passwords/:userId', async (req, res) => {
    const userId = req.params.userId
    try{
        const passwords = await getPasswords(userId)
        console.log("passwords : " , passwords)
        res.status(200).json(passwords)
    } catch (error){
        console.log("error on get passwords : " , error)
        res.status(500).json(error)
    }
})

router.get('/get-password/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try{
        const password = await getPasswordById(id)
        console.log("password : " , password)
        res.status(200).json(password)
    } catch (error){
        console.log("error on get password : " , error)
        res.status(500).json(error)
    }
})

export default router;