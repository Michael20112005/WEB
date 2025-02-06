const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../")));

let mobs = [
  {
    id: uuidv4(),
    name: "Angel",
    life: 100,
    strength: 50,
    image: "/img/angel.png",
  },
  {
    id: uuidv4(),
    name: "Enderman",
    life: 80,
    strength: 90,
    image: "/img/enderman.png",
  },
  {
    id: uuidv4(),
    name: "Pig",
    life: 40,
    strength: 10,
    image: "/img/pig.png",
  },
  {
    id: uuidv4(),
    name: "Skeleton",
    life: 70,
    strength: 60,
    image: "/img/skeleton.png",
  },
  {
    id: uuidv4(),
    name: "Steve",
    life: 90,
    strength: 70,
    image: "/img/steve.png",
  },
  {
    id: uuidv4(),
    name: "Zombie",
    life: 50,
    strength: 40,
    image: "/img/zombie.png",
  },
];

app.get("/mobs", (req, res) => {
  let { searchQuery = "", sortBy = "" } = req.query;
  searchQuery = searchQuery.toLowerCase();

  let filteredMobs = mobs;

  if (searchQuery) {
    filteredMobs = filteredMobs.filter((mob) =>
      mob.name.toLowerCase().includes(searchQuery)
    );
  }

  if (sortBy === "name") {
    filteredMobs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "life") {
    filteredMobs.sort((a, b) => b.life - a.life);
  } else if (sortBy === "strength") {
    filteredMobs.sort((a, b) => b.strength - a.strength);
  }

  const totalLife = filteredMobs.reduce((acc, mob) => acc + mob.life, 0);
  const totalStrength = filteredMobs.reduce(
    (acc, mob) => acc + mob.strength,
    0
  );

  res.json({
    mobs: filteredMobs,
    totalLife,
    totalStrength,
  });
});

app.get("/mobs/:id", (req, res) => {
  const { id } = req.params;
  const mob = mobs.find((m) => m.id === id);

  if (!mob) {
    return res.status(404).json({ message: "Mob not found" });
  }

  res.json(mob);
});

app.post("/mobs", (req, res) => {
  const { name, life, strength, image } = req.body;

  if (!name || typeof life !== "number" || typeof strength !== "number") {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const newMob = {
    id: uuidv4(),
    name,
    life,
    strength,
    image: image || "/img/default.png",
  };

  mobs.push(newMob);
  res.status(201).json(newMob);
});

app.put("/mobs/:id", (req, res) => {
  const { id } = req.params;
  const { name, life, strength, image } = req.body;

  const mobIndex = mobs.findIndex((m) => m.id === id);
  if (mobIndex === -1) {
    return res.status(404).json({ message: "Mob not found" });
  }

  const updatedMob = {
    ...mobs[mobIndex],
    name: name || mobs[mobIndex].name,
    life: typeof life === "number" ? life : mobs[mobIndex].life,
    strength: typeof strength === "number" ? strength : mobs[mobIndex].strength,
    image: image || mobs[mobIndex].image,
  };

  mobs[mobIndex] = updatedMob;
  res.json(updatedMob);
});

app.delete("/mobs/:id", (req, res) => {
  const { id } = req.params;
  const mobIndex = mobs.findIndex((m) => m.id === id);

  if (mobIndex === -1) {
    return res.status(404).json({ message: "Mob not found" });
  }

  mobs.splice(mobIndex, 1);
  res.status(204).send();
});

app.delete("/mobs", (req, res) => {
  mobs = [];
  res.status(200).json({ message: "All mobs deleted successfully" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
