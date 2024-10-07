const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use("/api/v1",userRoutes)
app.use("/api/v1/book",bookRoutes)

app.get("/",(req,res)=>{
    res.send("<center><h1>E-Library Management Api</h1><br>Get Recipe Api <a href=https://github.com/Devanshiballar/E-Library-Management.git target=_blank>Repository :E-Library Management</a></center>")
  })
  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });