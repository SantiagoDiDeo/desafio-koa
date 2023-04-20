const { v4: uuidv4 } = require('uuid');
const { productModel } = require('../DB/model/modelMongo');

class Container { 

  constructor( schema ) {
      this.schema = schema;
  };
  

  getAray() {
    return this.schema
  }
 

  getById( id ) {
    const product = this.schema.find( e => e.id === id );
    return product ? product : null;
  };



  deleteAll() {
    this.schema = [];
    return;
  };


  add( prod ) {
    prod.id = uuidv4();
    this.schema.push( prod );
    return;
  };

};

const productsMemory = new Container( productModel );

module.exports = {productsMemory}; 