import express from 'express';
import axios from 'axios';
import cors from 'cors';
import depositRoutes from './routes/depositRoutes.js';
import callbackRoutes from './routes/callbackRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/client/mpesa', depositRoutes);
app.use('/api/client/mpesa-callback', callbackRoutes);

app.listen(5000, () => {
  console.log('listening on 5000');
});
