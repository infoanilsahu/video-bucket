import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './api/auth';
import videoRoutes from './api/video';
import cookieParser from 'cookie-parser'
import objectStore from './api/objectStore'

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/getpresignurl', objectStore)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});