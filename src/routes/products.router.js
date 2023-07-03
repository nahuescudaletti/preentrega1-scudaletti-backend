import { Router } from "express";
import ProductManager from "../managers/productsManager.js";

const router = Router();
const productsFilePath = 'data/products.json';
const productManager = new ProductManager(productsFilePath); // Pasar la ruta del archivo al constructor

router.get("/", (req, res) => {
  const { limit } = req.query;
  const products = productManager.getAllProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productManager.getProductById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

router.post("/", (req, res) => {
  const { title, description, price, code, stock, category, thumbnails } = req.body; // Extraer los datos individuales del producto
  const newProduct = productManager.addProduct(title, description, price, code, stock, category, thumbnails); // Pasar los datos individuales al método addProduct
  res.json(newProduct);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const updatedProduct = productManager.updateProduct(id, updatedFields);

  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const result = productManager.deleteProduct(id);

  if (result) {
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

export default router;
