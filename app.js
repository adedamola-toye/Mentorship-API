import express from 'express';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import authRoutes from './routes/authRoutes'

dotenv.config(); //load environmental variables from a .env file into process.env

const app = express();
app.use(express.json())

app.get('/',(req,res) => {
  res.send('Welcome')
})

app.use("/api/auth", authRoutes)

export default app