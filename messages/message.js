import twilio from 'twilio';


const sendSMS = async ( sms ) => {
  const client = twilio( process.env.SID_ACCOUNT, process.env.AUTH_ACCOUNT )
  const message = await client.messages.create({
    body: sms.body,
    from: process.env.SMS_PHONE,
    to: sms.number
  });
  return message;
};

export default sendSMS ;