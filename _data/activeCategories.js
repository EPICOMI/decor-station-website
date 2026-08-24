import getProducts from "./products.js";

export default () => {
  const products = getProducts();
  const categories = new Set();

  products.forEach((product) => {
    if (product.active && product.category) {
      categories.add(product.category);
    }
  });

  return Array.from(categories).sort();
};
