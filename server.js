//import express from "express"

const express = require ("express");
const clc= require("cli-color");
const authRoute = require("./routes/authRoute");
const connectMongoDb = require("./utils/connectMongoDb");
require("dotenv/config");


const app = express();
const PORT = process.env.PORT;



//middleware
app.set ("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//route
app.use("/",authRoute)

app.listen (PORT,()=>{
    console.log(clc.yellowBright.bold(`Sever is running at PORT : ${PORT}`));
    //db connection
    connectMongoDb();
})

