const { sidAccount, authToken } = require('../enviroments/enviroment');
const logger = require('../logger/logger');
 const client = require('twilio')(sidAccount, authToken);


const sendWhatsapp = async ( whatsappMsg ) => {
  client.messages.create({
        body: whatsappMsg.body,
        from: process.env.WPP_NUMBER,
        to: `whatsapp:${whatsappMsg.to}`
    })
    .then(message => logger.info(message.sid))
};

    
module.exports = { sendWhatsapp };