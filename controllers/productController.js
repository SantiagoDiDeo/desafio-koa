import { getProductsDto, getProductsByIdDto, deleteAllProductsDto, addProductDto, deleteProductByIdDto } from '../dto/productsDto.js';
import mongoose from 'mongoose';

const validateObject = ( object ) => { 
  return Object.values(object).includes('')
}


const imageUrl = ( url ) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  return ext.test( url )
}


const addProductController = async ( productToAdd ) => {
    const newProduct = await addProductDto( productToAdd);
     
    return newProduct;

};

const getProductsController = async() => {
  const getProducts = await getProductsDto();
  if (getProducts.length === 0) {
    return [];
  };
  return getProducts;
};

const getProductByIdController = async( id ) => {
  if (typeof id !== 'Object') {
    id = new mongoose.Types.ObjectId(id);
    const productById = await getProductsByIdDto( id )
    return productById;
  }; 
};

const deleteProductByIdController = async (id) => {
  const deleteProduct = await deleteProductByIdDto(id);
  return deleteProduct;
};

 const deleteProductController = async() => {
  // comentado por seguridad.
//   await deleteAllProductsDto();
//   return;
};


export  { addProductController, getProductsController, getProductByIdController, deleteProductController, deleteProductByIdController };