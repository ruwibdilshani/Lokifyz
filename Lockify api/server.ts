import dotnev from 'dotenv';
import express from 'express';
import cross from 'cors';
import passwordRouter from './router/PasswordRouter'
import authRouter, { authenticateToken } from './router/AuthRouter'
import userRouter from './router/UserRouter'

dotnev.config();
const app = express();

app.use(express.json());

app.use(cross({
    origin: "*"
}))

app.options('*', cross());

app.use('/auth' , authRouter);

app.use(authenticateToken)

app.use('/passwords' , passwordRouter);
app.use('/user', userRouter)

app.listen(5000, "0.0.0.0" , () => {
    console.log(`Server is running on port 5000`)
})