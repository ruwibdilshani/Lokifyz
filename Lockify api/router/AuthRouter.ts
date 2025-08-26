import express from 'express';
import { addUser , verifyUser } from '../db/prisma-user-store';
import jwt, {Secret} from 'jsonwebtoken';
import { console } from 'inspector';

const router = express.Router();

router.post("/register", async (req, res) => {
    const user = req.body;
    try {
        const newUser = await addUser(user);
        console.log("user registered : ", newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.log("error on register user : ", error);
        res.status(500).json(error);
    }
});
