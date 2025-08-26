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

router.post("/login", async (req, res) => {
    const user = req.body as {email : string, password : string};
    try {
        const verifiedUser = await verifyUser(user);
        console.log("user verified : ", verifiedUser);
        if(verifiedUser){
            const token = jwt.sign({email : verifiedUser.email}, process.env.SECRET_KEY as Secret );
            console.log("token : ", token);
            const refreshToken = jwt.sign({email : verifiedUser.email}, process.env.REFRESH_TOKEN as Secret);
            console.log("refresh_token : ", refreshToken);
            res.status(200).json({token : token, refreshToken : refreshToken , userEmail : verifiedUser.email});
        } else {
            res.status(401).json({message : "Invalid credentials"})
        }
    } catch (error) {
        console.log("error on verify user : ", error);
        res.status(500).json(error);
    }
} );
