import fs from "fs";
import express from "express";

const app = express();

class ProductManager {
  constructor(productsPath) {
    this.products = [];
    this.productsId = 0;
    this.productsPath = productsPath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.productsPath, "utf8");
      this.products = JSON.parse(data);
      this.updateProductsId();
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products);
    fs.writeFileSync(this.productsPath, data, "utf8");
  }

  updateProductsId() {
    if (this.products.length > 0) {
      this.productsId = Math.max(...this.products.map((product) => product.id));
    }
  }

  addProduct(title, description, price, image, code, stock) {
    if (!title || !description || !price || !image || !code || !stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.log("El código ya existe.");
      return;
    }

    const product = {
      id: ++this.productsId,
      title,
      description,
      price,
      image,
      code,
      stock,
    };
    this.products.push(product);
    this.saveProducts();
  }

  getProductById(idProduct) {
    const product = this.products.find((product) => product.id === idProduct);
    if (!product) {
      console.log("No encontrado.");
      return;
    }
    return product;
  }

  updateProduct(idProduct, updatedFields) {
    const product = this.products.find((product) => product.id === idProduct);
    if (!product) {
      console.log("No encontrado.");
      return;
    }

    Object.assign(product, updatedFields);
    this.saveProducts();
  }

  deleteProduct(idProduct) {
    const index = this.products.findIndex(
      (product) => product.id === idProduct
    );
    if (index === -1) {
      console.log("No encontrado.");
      return;
    }

    this.products.splice(index, 1);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }
}

const productManager = new ProductManager("./products.json");

// Agregar algunos productos de ejemplo
productManager.addProduct("remera", "azul", 80, "sin imagen", "ABC123", 10);
productManager.addProduct("jeans", "negro", 20, "sin imagen", "ABC124", 15);
productManager.addProduct(
  "zapatillas",
  "rojas",
  50,
  "sin imagen",
  "ABC125",
  20
);
productManager.addProduct("corbata", "azul", 80, "sin imagen", "ABC125", 10);
productManager.addProduct("pantalon", "azul", 80, "sin imagen", "ABC126", 10);
productManager.addProduct("buzo", "azul", 80, "sin imagen", "ABC127", 10);
productManager.addProduct("medias", "azul", 80, "sin imagen", "ABC128", 10);
productManager.addProduct("boxer", "azul", 80, "sin imagen", "ABC129", 10);
productManager.addProduct("camperon", "azul", 80, "sin imagen", "ABC1210", 10);
productManager.addProduct("cargo", "azul", 80, "sin imagen", "ABC1211", 10);
productManager.addProduct("chaleco", "azul", 80, "sin imagen", "ABC1212", 10);

// Rutas de la API
app.get("/products", (req, res) => {
  const { limit } = req.query;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = productManager.getProductById(parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
