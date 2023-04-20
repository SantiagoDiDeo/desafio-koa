const { chatModel } = require('../DB/model/modelMongo');
const { normalizedData } = require('../normalizr/normalizr');


class Container { 

    constructor( schema ) {
        this.schema = schema;
    };

  getArray() {
    return normalizedData(this.schema.chat)
  }
 

  async add( message ) {
    await this.schema.chat.push({
        user: { 
          email: message.author.id,
          name: message.author.name,
          surmame: message.author.surname,
          age: message.author.age,
          nickname: message.author.nickname,
          avatar: message.author.avatar,
        },
        message: {
          timestamp: message.date,
          text: message.text
          } 
      });
    return;
  };


};

const ChatsMemory = new Container ( chatModel );

module.exports = {ChatsMemory};