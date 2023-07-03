import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
constructor(productsPath) {
  this.products = [];
  this.productsPath = productsPath;
  this.loadProducts();
  }

   loadProducts() {
    try {
      const data = fs.readFileSync(this.productsPath, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
      this.saveProducts();
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products);
    fs.writeFileSync(this.productsPath, data, "utf8");
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }

  addProduct(title, description, price, code, stock, category, thumbnails) {
    const id = uuidv4();

    const product = {
      id,
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
      status: true,
    };
    this.products.push(product);
    this.saveProducts();
  }

  updateProduct(productId, updatedFields) {
    const product = this.getProductById(productId);
    if (!product) {
      return null; // Indicar que el producto no fue encontrado
    }
    Object.assign(product, updatedFields);
    this.saveProducts();
    return product;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(
      (product) => product.id === productId
    );
    if (index === -1) {
      return false; // Indicar que el producto no fue encontrado
    }
    this.products.splice(index, 1);
    this.saveProducts();
    return true; // Indicar que el producto fue eliminado correctamente
  }
}

export default ProductManager;
