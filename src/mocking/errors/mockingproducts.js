const express = require('express');
const router = express.Router();

router.get('/mockingproducts', (req, res) => {
    const products = generateMockProducts();
    res.json(products);
  });
  
function generateMockProducts() {
    const products = [];
    for (let i = 1; i <= 100; i++) {
      const product = {
        _id: i,
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 1, 
        category: `Category ${Math.floor(Math.random() * 5) + 1}` 
      };
      products.push(product);
    }
    return products;
}
  
module.exports = generateMockProducts;