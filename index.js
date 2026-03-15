import 'dotenv/config';
import express from 'express';
import connectDB from './connection.js';
import postRouter from './routes/post.routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

await connectDB(process.env.MONGO_URL);

app.get('/', (req, res) => {
    res.send("Home route");
});

app.use('/post', postRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));