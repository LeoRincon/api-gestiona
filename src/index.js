import express from 'express';
import cors from 'cors';
import apiV1Router from './routers/apiV1Router.js';

const PORT = process.env.PORT || 8080;

const corsOptions = {
 origin: 'http://localhost:5173',
 credentials: true,
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

const app = express();
app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(express.json());
app.use(apiV1Router);

app.listen(PORT);
console.log(`app running on port ${PORT}`);
