import express from 'express';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import mentorRoutes from './routes/mentorRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


dotenv.config(); //load environmental variables from a .env file into process.env


const app = express();
app.use(express.json())


// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my app"
    },
    servers: [
      {
        url: "http://localhost:3000/api-docs"
      }
    ]
  },
  apis: ["./routes/*.js"],  // Points to the location of your route files with annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/',(req,res) => {
  res.send('Welcome')
})

app.use("/api/", authRoutes)
app.use("/api/", adminRoutes)
app.use("/api/", mentorRoutes)
app.use("/api/", sessionRoutes)

export default app