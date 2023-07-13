router.get("/home", (req, res) => {
  // Obtener los datos necesarios para la vista "home"
  // Por ejemplo, puedes obtener los productos desde tu gestor de productos
  const products = []; // Obtener los productos desde tu gestor de productos

  res.render("home", { products });
});
