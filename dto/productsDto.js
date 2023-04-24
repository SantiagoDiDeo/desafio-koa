import getDao from '../class/factoryClasses.js';

const getProductsDto = async() => {
    const products = await getDao().products;
    const allProducts = await products.getArray();
    return allProducts;
};

const getProductsByIdDto = async(id) => {
    const products = await getDao().products;
    const allProducts = await products.getById(id);
    return allProducts;
};

const deleteAllProductsDto = async() => {
    const products = await getDao().products;
    await products.deleteAll();
    return;
};

/* const addProductDto = async() => {
    const products = await getDao().products;
    console.log(products)
    await products.add(product);
    return;
}; */
const addProductDto = async (product) => {
    const dao = await getDao();
    if (!dao) {
      throw new Error('DAO not available');
    }
  
    const products = await dao.products;
    if (!products) {
      throw new Error('Products not available');
    }
  
    await products.add(product);
  };
  

export  {getProductsDto, getProductsByIdDto , deleteAllProductsDto, addProductDto};
