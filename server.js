require("dotenv/config");
//import express from "express"
const express = require("express");
const clc = require("cli-color");

// File imports
const connectMongoDb = require("./utils/connectMongoDb.js");

const authRoute = require("./routes/authRoute.js");
const taskRoute = require("./routes/taskRoute.js");

const app = express();
const PORT = process.env.PORT;

// Global middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", authRoute);

// app.use("/dashboard", dashboardRoute);
app.use("/task", taskRoute);

app.listen(PORT, () => {
  console.log(
    clc.yellowBright.bold(
      `Server is connected on port: ${clc.greenBright.italic(PORT)}`
    )
  );
  console.log(clc.greenBright.bold.italic(`http://localhost:${PORT}`));
  //db connection
  connectMongoDb();
});
