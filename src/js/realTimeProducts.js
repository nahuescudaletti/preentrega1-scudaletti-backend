const socket = io();

socket.on('productList', (products) => {
  // Actualiza la vista con la lista de productos recibida desde el servidor
  // Puedes utilizar jQuery u otras librerías para manipular el DOM
  console.log(products);
});

socket.on('productCreated', (newProduct) => {
  // Agrega el nuevo producto a la vista en tiempo real
  // Puedes utilizar jQuery u otras librerías para manipular el DOM
  console.log(newProduct);
  const productList = document.getElementById('productList');
  const productItem = document.createElement('li');
  productItem.innerText = newProduct.title;
  productList.appendChild(productItem);
});

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const title = form.elements['title'].value;
  const description = form.elements['description'].value;
  const price = form.elements['price'].value;
  const code = form.elements['code'].value;
  const stock = form.elements['stock'].value;
  const category = form.elements['category'].value;
  const productData = { title, description, price, code, stock, category };
  socket.emit('createProduct', productData);
  form.reset();
});
