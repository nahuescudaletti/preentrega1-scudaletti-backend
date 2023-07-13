import express from 'express';
import { Server } from 'socket.io';
import fs from 'fs';

const router = express.Router();
const io = new Server();
const productsFilePath = 'data/productsRealTime.json';

router.get('/home', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  res.render('realtimeproducts', { products });
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('createProduct', (productData) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const newProduct = {
      ...productData,
      id: Math.floor(Math.random() * 1000), // Generar un ID aleatorio
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf8');
    io.emit('productCreated', newProduct);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

export default router;
