const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uri =
  "mongodb+srv://21pa1a1237:charan2004@cluster0.sjblvmp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express();
app.use(cors());
app.use(express.json());

const connection = async () => {
  try {
    const res = await client.connect();
    if (res.topology.isConnected()) {
      console.log("DB is connected");
    }
  } catch (err) {
    console.log(err);
  }
};

app.get("/data", async (req, res) => {
  await connection();
  const collection = client.db("startupindia").collection("companies");
  const data = await collection.find().toArray();
  res.json(data);
});

app.post("/register", async (req, res) => {
  await connection();
  const collection = client.db("startupindia").collection("users");
  const { name, email, password } = req.body;

  const existingUser = await collection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password strength
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = { name, email, password: hashedPassword };
  const result = await collection.insertOne(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  await connection();
  const collection = client.db("startupindia").collection("users");
  const { email, password } = req.body;
  const user = await collection.findOne({ email });
  console.log(user);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, "your_secret_key_here", {
    expiresIn: "1h",
  });
  res.json({ token, user });
});

app.post("/form", async (req, res) => {
  await connection();
  const collection = client.db("startupindia").collection("companies");
  const { formData } = req.body;
  console.log(formData);
  await collection.insertOne(formData);
  res.json({ message: "Company data submitted successfully" });
});

app.post("/filter", async (req, res) => {
  await connection();
  const collection = client.db("startupindia").collection("companies");
  const { filter } = req.body;
  const filteredData = await collection
    .find({ category: `${filter}` })
    .toArray();
  console.log(filteredData);
  res.json(filteredData);
});

app.listen(3001, () => {
  console.log("server started");
});
