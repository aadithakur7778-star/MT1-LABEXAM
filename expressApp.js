import express from "express";

const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Shopping cart array
let cart = [
  {
    id: 1,
    productName: "Wireless Mouse",
    price: 799,
    quantity: 2,
    category: "Electronics",
  },
  {
    id: 2,
    productName: "Keyboard",
    price: 999,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 3,
    productName: "Notebook",
    price: 100,
    quantity: 5,
    category: "Stationery",
  },
];

// Validate product details
function validProduct(product) {
  return (
    typeof product.productName === "string" &&
    product.productName.trim() !== "" &&
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    Number.isInteger(product.quantity) &&
    product.quantity > 0 &&
    typeof product.category === "string" &&
    product.category.trim() !== ""
  );
}

// GET - Retrieve all products
app.get("/cart", (req, res) => {
  res.status(200).json(cart);
});

// GET - Retrieve product by ID
app.get("/cart/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = cart.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    ...product,
    totalPrice: product.price * product.quantity,
  });
});

// POST - Add new product
app.post("/cart", (req, res) => {
  const product = req.body;

  if (
    product.id == null ||
    !Number.isInteger(Number(product.id)) ||
    cart.some((item) => item.id === Number(product.id)) ||
    !validProduct(product)
  ) {
    return res.status(400).json({
      message: "Invalid or duplicate product details",
    });
  }

  const newProduct = {
    ...product,
    id: Number(product.id),
  };

  cart.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct,
  });
});

// PUT - Update product
app.put("/cart/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const updatedProduct = {
    ...cart[index],
    ...req.body,
    id: id,
  };

  if (!validProduct(updatedProduct)) {
    return res.status(400).json({
      message: "Invalid product details",
    });
  }

  cart[index] = updatedProduct;

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

// DELETE - Remove product
app.delete("/cart/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = cart.splice(index, 1);

  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct[0],
  });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Invalid routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});