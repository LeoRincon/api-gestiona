import express from 'express';
import session from 'express-session';
import apiV1Router from './routers/apiV1Router.js';

const PORT = process.env.PORT || 8080;

const { SESSION_SECRET_KEY } = process.env;

const app = express();
app.use((_, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
 next();
});
app.disable('x-powered-by');
app.use(express.json());
app.use(
 session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
   secure: process.env.NODE_ENV === 'production',
   httpOnly: true,
   maxAge: 1000 * 60 * 60,
  },
 })
);
app.use(apiV1Router);

app.listen(PORT);
console.log(`app running on port ${PORT}`);
