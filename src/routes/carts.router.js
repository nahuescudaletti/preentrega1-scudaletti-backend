import { Router } from "express";
import CartsManager from "../managers/cartsManager.js";
import express from "express";

const router = Router();
const cartsManager = new CartsManager("data/carts.js");

// Middleware para analizar el cuerpo de la solicitud como JSON
router.use(express.json())

router.get("/", (req, res) => {
  const allCarts = cartsManager.getAllCarts();
  res.json(allCarts);
});

router.post("/", (req, res) => {
  const newCart = cartsManager.addCart();
  res.json(newCart);
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = cartsManager.getCartById(cid);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Cart not found" });
  }
});



router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const result = cartsManager.addProductToCart(cid, pid, quantity);

  if (result) {
    res.json({ message: "Product added to cart successfully" });
  } else {
    res.status(404).json({ error: "Cart or product not found" });
  }
});

export default router;
