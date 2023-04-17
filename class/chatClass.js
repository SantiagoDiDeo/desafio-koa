const connectToDb = require('../DB/config/connectToDb');
const { chatModel } = require('../DB/model/modelMongo');
const normalizedData = require('../normalizr/normalizr');
const logger = require('../logger/logger');

class Container {

  constructor( schema ) {
      this.schema = schema;
  };
  

  async getArray() {
    try{
      await connectToDb();
      const messagesInDb = await this.schema.findOne ( { chatid: 'chat1'},
        { projection: { messages: 1, _id: 0 }} );
      return normalizedData( messagesInDb );
      logger.info(messagesInDb);
    } catch(err) {
      logger.error();(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    };
  };
 

  async add( message ) {
    try{
      await connectToDb();
      const messagesInDb = await this.schema.findOne ( { chatid: 'chat1' } ,
      { projection: { messages: 1, _id: 0 }} );
      await this.schema.updateOne( { chatid: 'chat1' } ,
      { $set: { messages: messagesInDb.push( message) }} );
      return
    } catch(err) {
      logger.error(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    };
  };

};


const chats = new Container ( chatModel );


module.exports = {chats};