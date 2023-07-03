import { v4 as uuidv4 } from "uuid";
import fs from "fs";

class CartsManager {
  constructor(productsFilePath) {
    this.productsFilePath = productsFilePath;
    this.carts = [];
    this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.productsFilePath);
      this.carts = JSON.parse(data);
    } catch (err) {
      this.carts = [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.productsFilePath, JSON.stringify(this.carts));
  }

  getAllCarts() {
    return this.carts;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addCart() {
    const id = uuidv4();
    const newCart = {
      id,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    if (!cart) {
      return null;
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        id: productId,
        quantity,
      });
    }

    this.saveCarts();
    return cart;
  }

  getProductsInCart(cartId) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    return cart ? cart.products : [];
  }
}

export default CartsManager;
