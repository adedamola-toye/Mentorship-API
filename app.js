import express from 'express';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import authRoutes from './routes/authRoutes'
import adminRoutes from './routes/adminRoutes'
import mentorRoutes from './routes/mentorRoutes'
import sessionRoutes from './routes/sessionRoutes'

dotenv.config(); //load environmental variables from a .env file into process.env

const app = express();
app.use(express.json())

app.get('/',(req,res) => {
  res.send('Welcome')
})

app.use("/api/", authRoutes)
app.use("/api/", adminRoutes)
app.use("/api/", mentorRoutes)
app.use("/api/", sessionRoutes)

export default app