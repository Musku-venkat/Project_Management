const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/mongo");
const router = require("./router/router");

const app = express();
dotenv.config();

const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log("Server Running");
});
