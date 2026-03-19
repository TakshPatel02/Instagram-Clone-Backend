import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './connection.js';
import postRouter from './routes/post.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization']
}));

await connectDB(process.env.MONGO_URL);

app.get('/', (req, res) => {
    res.send("Home route");
});

app.use('/post', postRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));