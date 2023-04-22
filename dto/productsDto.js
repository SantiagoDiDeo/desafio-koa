import getDao from '../class/factoryClasses.js';

const getProductsDto = async() => {
    const products = await getDao().products;
    console.log(products)
    const allProducts = await products.getArray();
    console.log(allProducts)
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

const addProductDto = async(product) => {
    const products = await getDao().products;
    await products.add(product);
    return;
};

export  {getProductsDto, getProductsByIdDto , deleteAllProductsDto, addProductDto};
