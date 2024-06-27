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
  res.send('Product Servcie is healthy');
});

app.listen(process.env.PORT, () => {
  console.log(`Product Service Listening on PORT ${process.env.PORT}`);
});
