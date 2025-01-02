const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();
const AuthRoutes = require("./routes/AuthRoutes");
const CardRoutes = require("./routes/CardRoutes");

const app = express();
app.use(bodyparser.json());
app.use(cors());
dotenv.config();



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>console.log("mongodb connected")).catch(err => console.log("MongoDB Connection Error:", err));

app.use("/auth", AuthRoutes);
app.use("/card", CardRoutes);




PORT = process.env.PORT;
app.listen(PORT, ()=>{console.log("server is running on "+PORT);})
