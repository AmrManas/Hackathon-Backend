require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").Server(app);

const routes = require("./routes/index");

const database =
  "mongodb+srv://mk1316a:manas1316@project-management.zqcb5.mongodb.net/myFirstDatabase";

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

// Connecting routes
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .then(() => {
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || "0.0.0.0";
    http.listen(PORT, HOST, () => {
      console.log(`Server Started on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
