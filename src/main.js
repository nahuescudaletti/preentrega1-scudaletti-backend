import express from "express";
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import path from "path";


const app = express();
const PORT = 8080;

app.use(express.json());

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// Configurar las rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Configurar el servidor HTTP
const server = http.createServer(app);

// Configurar el servidor de Socket.IO y asociarlo al servidor HTTP
const io = new Server(server);

// Lógica de actualización en tiempo real con Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  // Aquí puedes agregar la lógica de actualización en tiempo real

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor HTTP
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
