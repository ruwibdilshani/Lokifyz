import express from 'express';
import { checkMasterPassword } from '../db/prisma-user-store';

const router = express.Router();

router.post('/check-master-password', async (req, res) => {
    const {email, masterPassword} = req.body;
    try {
        const user = await checkMasterPassword(email, masterPassword);
        console.log("user : ", user);
        if(user){
            res.status(200).json(user);
        } else {
            res.status(401).json({message : "Invalid credentials"});
        }
    } catch (error) {
        console.log("error on check master password : ", error);
        res.status(500).json(error);
    }
})

export default router;