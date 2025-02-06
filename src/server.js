const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3001; // Ensure the port doesn’t conflict with the frontend (adjust if needed)

// Define images path
const imagesPath = path.join(__dirname, "images");

// Check if images directory exists
if (!fs.existsSync(imagesPath)) {
  console.error(`Error: Images directory not found at ${imagesPath}`);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the images directory
app.use("/images", express.static(imagesPath));

// Catalog data for e-commerce products
const catalogItems = [
  {
    id: "1",
    title: "Cat Bed",
    category: "Accessories",
    priceRange: "High",
    description: "Soft and cozy bed for your cat",
    price: 149,
    img_path: "/images/item1.jpg",
  },
  {
    id: "2",
    title: "Cat Scratcher",
    category: "Toys",
    priceRange: "High",
    description: "Durable scratcher for healthy claws",
    price: 80,
    img_path: "/images/item2.jpg",
  },
  {
    id: "3",
    title: "Cat Carrier",
    category: "Accessories",
    priceRange: "Low",
    description: "Stylish carrier for comfortable travel",
    price: 29,
    img_path: "/images/item3.jpg",
  },
  {
    id: "4",
    title: "Cat Toys",
    category: "Toys",
    priceRange: "Medium",
    description: "Engaging toys to keep your cat active, happy, and healthy!",
    price: 45,
    img_path: "/images/item4.jpg",
  },
];

// Endpoint to fetch catalog items with optional filters
app.get("/catalog", (req, res) => {
  const { category, priceRange, search } = req.query;
  let filteredItems = [...catalogItems];

  // Apply filters
  if (category && category !== "All") {
    filteredItems = filteredItems.filter((item) => item.category === category);
  }
  if (priceRange && priceRange !== "All") {
    filteredItems = filteredItems.filter(
      (item) => item.priceRange === priceRange
    );
  }
  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredItems);
});

// Endpoint to fetch a single product by ID
app.get("/catalog/:id", (req, res) => {
  const itemId = req.params.id;
  const product = catalogItems.find((item) => item.id === itemId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
    }
  });

const cart = [];

// Fetch all cart items
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Add an item to the cart
app.post("/cart", (req, res) => {
  const newItem = req.body;
  cart.push(newItem);
  res.status(201).json(newItem);
});

// Update an item in the cart
app.put("/cart/:id", (req, res) => {
  const { id } = req.params;
  const { size, quantity } = req.body;
  const item = cart.find((item) => item.id === id && item.size === size);
  if (item) {
    item.quantity = quantity;
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Delete an item from the cart
app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  const { size } = req.body;
  const index = cart.findIndex((item) => item.id === id && item.size === size);
  if (index !== -1) {
    const removedItem = cart.splice(index, 1);
    res.json(removedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Clear the cart
app.delete("/cart", (req, res) => {
  cart.length = 0;
  res.status(204).send();
});
