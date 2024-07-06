// All testing functions related to tables
import * as source from './table'

const productTest = {
    imported_product_code: 'pt07',
    product_name: 'test product',
    brand: 'test brand',
    package_size: 1,
    package_unit: 'lb',
    incomming_image_url: "https://assets.shop.loblaws.ca/products/20766719/b1/en/front/20766719_front_a01_@2.png",
    grocery_id: 1
};

// Add a new product
source.addProduct(productTest.imported_product_code, 
                  productTest.product_name, 
                  productTest.brand, 
                  productTest.package_size, productTest.package_unit, productTest.incomming_image_url, productTest.grocery_id)
.then(result =>{
    console.log(result);
})
.catch(err =>{
    console.log(err);
})