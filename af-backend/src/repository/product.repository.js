import Product from "../models/product.model.js";
import logger from "../utils/logger.js";
// method to get all products
export const findProducts = async (farmerId) => {
  //chec whether products are available or not
  //if available return the products else return error
  try {
    let products = null;

    if (farmerId) {
      products = await Product.find({
        pSeller: farmerId,
      }).sort({
        _id: -1,
      });
    } else {
      products = await Product.find().sort({ _id: -1 });
    }
    if (products?.length == 0) {
      const error = new Error("Products not found");
      error.status = 404;
      throw error;
    }

    return products;
  } catch (err) {
    console.error(
      `An error occurred when retrieving products - err: ${err.message}`
    );
    throw err;
  }
};
// add new product to the database
export const createProduct = async (product) => {
  const newProduct = new Product(product);
  if (!newProduct) return null;

  try {
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (err) {
    console.error(
      `An error occurred when creating a product - err: ${err.message}`
    );
    // logger.error(err.message);
    return null;
  }
};

export const getProductByProductId = async (product_id) => {
  try {
    // get the product with the specified pPid
    //if available return the product else return error
    let product = await Product.find({ pPid: product_id });
    if (product) {
      return product;
    } else {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
  } catch (err) {
    // logger.error(err.message);
    throw err;
  }
};
export const retriveOnSaleProduct = async () => {
  try {
    // get all products where sale state is true
    let products = await Product.find({
      pSaleStatus: true,
      pVisible: true,
    }).sort({ _id: -1 });
    // if products are found, return them
    if (products?.length == 0) {
      const error = new Error("On sale Products not found");
      error.status = 404;
      throw error;
    }
    return products;
  } catch (err) {
    console.log(err);

    throw err;
  }
};
export const updateVisiblity = async (product) => {
  try {
    // Update the product's pVisible field
    const newProduct = new Product(product);
    newProduct.pVisible = true;
    // Save the updated product
    let updatedProduct = await newProduct.save();
    return updatedProduct;
  } catch (error) {
    return null;
  }
};

export const getRemovedProduct = async (product_id) => {
  try {
    const product = await Product.findByIdAndDelete(product_id);
    return product;
  } catch (err) {
    return null;
  }
};

export const getUpdatedProduct = async (productData) => {
  try {
    const updatedProduct = await productData.save();
    return updatedProduct;
  } catch (err) {
    return null;
  }
};
