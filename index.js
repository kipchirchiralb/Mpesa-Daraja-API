import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import callbackRoutes from './routes/callbackRoutes.js';
import depositRoutes from './routes/depositRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs')


app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))

app.get('/',(req,res)=>{
  res.render('index.ejs')
})
app.post('/test/body', (req,res)=>{
  console.log(req.body.phone)
  console.log(req.body.amount)
})
app.use('/api/client/mpesa', depositRoutes);
app.use('/api/client/mpesa-callback', callbackRoutes);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
