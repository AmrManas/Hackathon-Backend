const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const io = require("socket.io")(http, {
  cors: {
    origin: [
      "https://propertyyards-customer-app.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://http://127.0.0.1:5000",
      "https://www.propertyyards.com",
      "https://propertyyards-agent-app.vercel.app",
    ],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const routes = require("./routes");

const { database } = require("./config/keys");

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const corsOptions = {
  origin: [
    "https://propertyyards-customer-app.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://www.propertyyards.com",
    "https://propertyyards-agent-app.vercel.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes);

// Connect to MongoDB
mongoose.set("useCreateIndex", true);
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || "127.0.0.1";
    http.listen(PORT, HOST, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on "
        )} http://${chalk.bgMagenta.white(HOST)}:${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));
