import  { v4 as uuidv4 }  from 'uuid';
import { productModel } from '../DB/model/modelMongo.js';

const products = [];

const mapProduct = (product) => product
  ? ({
    _id: product._id,
  title: product.title,
  description:product.description,
  code: product.code,
  price: product.price,
  stock: product.stock,
  thumbnail: product.thumbnail
  }) : null;
export class ProdMemory {

  constructor() {
    this.products = products;
  }
  

  async saveProduct(product) {
    const newProduct = {_id: uuidv4(), ...product};
    products.push(...products, newProduct);
    return mapProduct(product);
  };
 

  getProductById(id) {
    const product =  products.find((product) => product.id === id);
    return product;
  };

  getAllProducts() {
    return products;
  };

  async updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return null;
    }
    const updatedProductInstance = new productModel(updatedProduct);
    await productModel.findByIdAndUpdate(id, updatedProductInstance);
    const updatedProductDocument = await productModel.findById(id);
    this.products[productIndex] = updatedProductDocument;
    return updatedProductDocument;
  };

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return null;
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    this.products.splice(productIndex, 1);
    return deletedProduct;
  };

  async deleteAllProducts() {
    this.products = [];
    return true;
  }
  
};


// export class Container { 

//   constructor( schema ) {
//       this.schema = schema;
//   };
  

//   getAray() {
//     return this.schema
//   }
 

//   getById( id ) {
//     const product = this.schema.find( e => e.id === id );
//     return product ? product : null;
//   };



//   deleteAll() {
//     this.schema = [];
//     return;
//   };


//   add( prod ) {
//     prod.id = uuidv4();
//     this.schema.push( prod );
//     return;
//   };

// };

// const ProductsMemory = new Container(productModel);

// export default ProductsMemory;