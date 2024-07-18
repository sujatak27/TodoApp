const clc = require("cli-color");
const mongoose = require ("mongoose");



const connectMongoDb =  async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(clc.yellowBright.bold(`MongoDB connected : ${conn.connection.host}`));
} catch (error) {
 console.log(clc.redBright.underline("error"));
}
}

module.exports = connectMongoDb;