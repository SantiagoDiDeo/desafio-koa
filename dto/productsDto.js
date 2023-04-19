const {getDao} = require('../class/factoryClasses');

const getProductsDto = async() => {
    const products = await getDao().products;
    const allProducts = await products.getArray();
    return allProducts;
};

const getProductsByIdDto = async() => {
    const products = await getDao().products;
    const allProducts = await products.getById(id);
    return allProducts;
};

const deleteAllProductsDto = async() => {
    const products = await getDao().products;
    await products.deleteAll();
    return;
};

const addProductDto = async(product) => {
    const products = await getDao().products;
    await products.add(product);
    return;
};

module.exports = {getProductsDto, getProductsByIdDto , deleteAllProductsDto, addProductDto};
