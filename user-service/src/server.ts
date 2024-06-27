import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

app.get('/', (req, res) => {
  res.send('User Servcie is healthy');
});

app.listen(process.env.PORT, () => {
  console.log(`User Service Listening on PORT ${process.env.PORT}`);
});
