import express from 'express';
import apiRouter from './routes/api.js';
import { Request, Response } from 'express';
import cors from 'cors'
import { env } from './config.js';

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(cors({
  origin: env.FRONTEND_URL, // Allow only your Vue app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express API' });
});

app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});