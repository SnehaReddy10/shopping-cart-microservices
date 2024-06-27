import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Order Servcie is healthy');
});

app.listen(process.env.PORT, () => {
  console.log(`Order Service Listening on PORT ${process.env.PORT}`);
});
