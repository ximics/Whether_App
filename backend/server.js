import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();
// connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
