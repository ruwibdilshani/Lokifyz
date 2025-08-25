import { PrismaClient } from "@prisma/client";
import { Passwords } from "../module/Password";

const prisma = new PrismaClient()

export async function add(p : Passwords){
    try{
        const savedPassword = await prisma.passwords.create({
            data : {
                emailOrUsername : p.emailOrUsername,
                password : p.password,
                website : p.website,
                userId : p.userId
            }
        })
        console.log("password saved : " , savedPassword)
        return savedPassword
    } catch (error){
        console.log("error on save password : " , error)
    }
}

export async function update(p : Passwords){
    try{
        const updatedPassword = await prisma.passwords.update({
            where : {
                id : p.id
            },
            data : {
                emailOrUsername : p.emailOrUsername,
                password : p.password,
                website : p.website,
            }
        })
        console.log("password updated : " , updatedPassword)
        return updatedPassword
    } catch (error){
        console.log("error on update password : " , error)
    }
}

export async function deletePassword(id: number){
    try{
        const deletedPassword = await prisma.passwords.delete({
            where : {
                id : id
            }
        })
        console.log("password deleted : " , deletedPassword)
        return deletedPassword
    } catch (error){
        console.log("error on delete password : " , error)
    }
}

export async function getPasswords(userId: string){
    try{
        const passwords = await prisma.passwords.findMany({
            where : {
                userId : userId
            }
        })
        console.log("passwords : " , passwords)
        return passwords
    }
    catch (error){
        console.log("error on get passwords : " , error)
    }
}

export async function getPasswordById(id: number){
    try{
        const password = await prisma.passwords.findUnique({
            where : {
                id : id
            }
        })
        console.log("password : " , password)
        return password
    }
    catch (error){
        console.log("error on get password : " , error)
    }
}