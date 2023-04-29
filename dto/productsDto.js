import {getDao} from '../class/factoryClasses.js';

const getProductsDto = async() => {
    const dao = await getDao();
    const allProducts = await dao.products.getAllProducts();
    return allProducts;
  };
  
  const addProductDto = async (productToAdd) => {
      const dao = await getDao();
      const newProduct = await dao.products.saveProduct(productToAdd);
      return newProduct;
    };


const getProductsByIdDto = async(id) => {
    const dao = await getDao();
    const getProductById = await dao.products.getProductById(id);
    return getProductById;
};

const deleteProductByIdDto = async (id) => {
    const dao = await getDao();
    const deleteProduct = await dao.products.deleteProduct(id);
    return deleteProduct;
};

const deleteAllProductsDto = async() => {
    const dao = await getDao();
    await dao.products.deleteAllProducts();
    return;
};


  

export  {getProductsDto, getProductsByIdDto , deleteProductByIdDto ,deleteAllProductsDto, addProductDto};
