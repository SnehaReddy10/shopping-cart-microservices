import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('User Servcie is healthy');
});

app.listen(process.env.PORT, () => {
  console.log(`User Service Listening on PORT ${process.env.PORT}`);
});
