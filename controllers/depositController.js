import axios from 'axios';
import envVars from '../utilities/envVars.js';
import getMpesaCredentials from '../utilities/getMpesaCredentials.js';
import getMpesaPassword from '../utilities/getMpesaPassword.js';

export const deposit = async (req, res, next) => {
  const { phone, amount } = req.body;
  const { access_token } = await getMpesaCredentials();

  const data = {
    BusinessShortCode: '174379',
    Password: getMpesaPassword().password,
    Timestamp: getMpesaPassword().timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: '174379',
    PhoneNumber: phone,
    CallBackURL: `${envVars.API_URL}/api/client/mpesa-callback/deposit`,
    AccountReference: 'MAYA000random',
    TransactionDesc: 'MAYA COMPUTERS',
  };

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  console.log(data)
  axios
    .post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      data,
      config
    )
    .then(res => {
      res.send({ res, success: true});
      console.log(res.body);
      console.log('successfuly sent request')


    })
    .catch(error => {
      res.send(error);
    });
};
