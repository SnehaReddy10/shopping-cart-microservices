import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { RegisterUser } from './services/register.service';
import { LoginUser } from './services/login-service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { GetUser } from './services/get-user.service';

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL ?? '')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(`Mongo Connection Failed ${err}`);
  });

const app = express();
app.use(express.json());

app.post('/auth/register', RegisterUser);
app.post('/auth/login', LoginUser);
app.get('/user', AuthMiddleware, GetUser);

app.listen(process.env.PORT, () => {
  console.log(`User Service Listening on PORT ${process.env.PORT}`);
});
