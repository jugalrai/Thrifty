const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Booking = require("./models/Booking.js");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = "sadxzczsfpozsjf";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cors(
   { credentials: true,
    origin: 'http://127.0.0.1:5173'}
  )
);

mongoose.connect('mongodb://127.0.0.1:27017/Booking')
  .then(() => console.log('MongoDB Connected!'));

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

// register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, 
          id: userDoc._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("invalid email or password");
    }
  } else {
    res.json("user not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { name, email, id } = await User.findById(userData.id);

      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/product", (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    addedPhotos,
    category,
    description,
    checkIn,
    checkOut,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const productDoc = await Product.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      category,
      description,
      checkIn,
      checkOut,
      price,
    });
    res.json(productDoc);
  });
});

app.get("/user-product", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Product.find({ owner: id }));
  });
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Product.findById(id));
});

app.put("/product", async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    catgeory,
    description,
    checkIn,
    checkOut,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const productDoc = await Product.findById(id);

    if (userData.id === productDoc.owner.toString()) {
      productDoc.set({
        title,
        address,
        photos: addedPhotos,
        category,
        description,
        checkIn,
        checkOut,
        price,
      });
      await productDoc.save();
      res.json("ok");
    }
  });
});

app.get("/product", async (req, res) => {
  res.json(await Product.find());
});

app.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post("/bookings", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Please log in to book a product" });
  }
  const userData = await getUserDataFromToken(req);
  const { product, checkIn, checkOut, category, name, email, phone, price } =
    req.body;
  Booking.create({
    product,
    checkIn,
    checkOut,
    name,
    email,
    price,
    phone,
    category,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromToken(req);
  if (!userData) {
    res.status(401).json({ message: "Please log in to view your bookings." });
    return;
  }
  res.json(await Booking.find({ user: userData.id }).populate("product"));
});

app.delete("/bookings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).send({ error: "Booking not found" });
    }
    res.send({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(` app listening on port ${process.env.PORT}`)
})


module.exports = app;
