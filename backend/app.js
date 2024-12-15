import dotenv from 'dotenv'
import mongoose from 'mongoose';
import express from "express"
import authRoutes from './routes/user.routes.js';
import datasetRoutes from './routes/dataset.routes.js'
import cors from 'cors'

// ENABLE DOT ENV 
dotenv.config();

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// ROUTE 
app.use('/api/auth', authRoutes);
app.use('/api/data', datasetRoutes);

mongoose
  .connect(process.env.MONGO_URI,{
    dbName: "roc8-visual-dashboard"
  }, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

export default app;
