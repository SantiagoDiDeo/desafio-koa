import connectToDb from '../DB/config/connectToDb.js';
import { productModel } from '../DB/model/modelMongo.js';
 export class prodMongoDao {

      ID_FIELD = '_id';

      saveProduct = async (productToAdd) => {
        const product = new productModel(productToAdd);
        const addedProduct = await product.save();
        return addedProduct;
        
    };

    getAllProducts = async () => {
      await connectToDb()
      const allProducts = await productModel.find({})
      return allProducts;
    };

    getProductById = async (id) => {
      
      await connectToDb();
      const productById = await productModel.findOne({ _id: id })
      return productById;
    };

    deleteProduct = async (id) => {
      await connectToDb();
      const productToDelete = await productModel.deleteOne({ _id: id })
      return productToDelete; 
      
    };

    deleteAllProducts = async ()=> {return await productModel.deleteMany()};

    updateProduct = async (id, productToUpdate) => {
        return await productModel.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

};
