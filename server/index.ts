import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './api/auth';
import videoRoutes from './api/video';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});