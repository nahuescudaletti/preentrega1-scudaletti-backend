import { Router } from "express";
import { Server } from "socket.io";
import ProductManager from "../managers/productsManager.js";

const router = Router();
const io = new Server();
const productsManager = new ProductManager("data/products.json");

router.get("/home", (req, res) => {
  const products = productsManager.getAllProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  const products = productsManager.getAllProducts();
  res.render("realTimeProducts", { products });
});

router.use((req, res, next) => {
  req.io = io;
  req.productsManager = productsManager;
  next();
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("createProduct", (productData) => {
    const { title, description, price, code, stock, category, thumbnails } = productData;
    const newProduct = productsManager.addProduct(title, description, price, code, stock, category, thumbnails);
    io.emit("productCreated", newProduct);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

export default router;
