import  { v4 as uuidv4 }  from 'uuid';
import { productModel } from '../DB/model/modelMongo.js';


export class Container { 

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

const ProductsMemory = new Container(productModel);

export default ProductsMemory;