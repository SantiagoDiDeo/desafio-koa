import connectToDb from '../DB/config/connectToDb.js';
import { productModel } from '../DB/model/modelMongo.js';
import logger from '../logger/logger.js';



 class Container {

  constructor( schema ) {
      this.schema = schema;
  };
  
  ID_FIELD = '_id';

  async getArray() {
    try{
      await connectToDb();
      const documentsInDb = await this.schema.find();
      return documentsInDb;
    } catch(err) {
      logger.error(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    };
  };
 


  async getById( id) {
    try {
      await connectToDb();
      const documentInDb = await this.schema.find({[this.ID_FIELD] : id});
      return documentInDb ? documentInDb : null;

    } catch(err) {
      logger.error(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    };
  };




  async deleteAll() {
    try {
      await connectToDb();
      await this.schema.deleteMany();
      return ;
    } catch(err) {
      console.log(`ERRORRRR ${err}`);
      logger.error(`Error: ${err}`);
    };
  };


  async add( item ) {
    try{
      await connectToDb();
      const newProduct = new productModel( item );
      await newProduct.save()
        .then(item => logger.info(`Se ha agregado a la base de datos elemento con id: ${{[this.ID_FIELD] : item}}`))
        .catch(err => logger.error(err));
      return;
    } catch(err) {
      logger.error(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    };
  };

};

const Products = new Container(productModel);


export default Products;