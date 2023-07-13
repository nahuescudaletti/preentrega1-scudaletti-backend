const socket = io();

socket.on('productList', (products) => {
  // Actualiza la vista con la lista de productos recibida desde el servidor
  // Puedes utilizar jQuery u otras librerías para manipular el DOM
  console.log(products);
});

socket.on('createProduct', (newProduct) => {
  // Agrega el nuevo producto a la vista en tiempo real
  // Puedes utilizar jQuery u otras librerías para manipular el DOM
  console.log(newProduct);
});

socket.on('deleteProduct', (productId) => {
  // Elimina el producto de la vista en tiempo real
  // Puedes utilizar jQuery u otras librerías para manipular el DOM
  console.log(productId);
});

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  const productData = { title, description, price, code, stock, category };
  socket.emit("createProduct", productData);
});
