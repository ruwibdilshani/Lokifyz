import { PrismaClient } from "@prisma/client";
import { User } from "../module/User";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export async function addUser(u: User) {
    try {
        console.log("Password: ", u.password);
        console.log("Master Password: ", u.masterPassword);

        // Check if passwords are non-empty before hashing
        if (!u.password || !u.masterPassword) {
            throw new Error('Password or Master Password is missing');
        }

        const hashedPassword = await bcrypt.hash(u.password, 10);
        const hashedMasterPassword = await bcrypt.hash(u.masterPassword, 10);

        const savedUser = await prisma.user.create({
            data: {
                email: u.email,
                password: hashedPassword,
                masterPassword: hashedMasterPassword
            }
        });
        console.log("User saved: ", savedUser);
        return savedUser;
    } catch (error) {
        console.log("Error on save user: ", error);
    }
}


export async function verifyUser(u : {email : string , password : string} ) {
    try {
        const user = await prisma.user.findFirst({
            where : {
                email : u.email
            }
        })
        if(user){
            const isPasswordValid = await bcrypt.compare(u.password, user.password)
            if(isPasswordValid){
                return user
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (error){
        console.log("error on verify user : " , error)
    }
}

export async function checkMasterPassword(email : string, masterPassword : string){
    try {
        const user = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
        if(user){
            const isMasterPasswordValid = await bcrypt.compare(masterPassword, user.masterPassword)
            if(isMasterPasswordValid){
                return user
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (error){
        console.log("error on verify user : " , error)
    }
}