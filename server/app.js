const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

//MONGOOSE 




mongoose
  .connect("mongodb://localhost:27017/cohorts-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

 


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const Cohorts = require("./models/Cohorts.models");
const Students = require("./models/Students.model");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin:"http://localhost:5173", 
    methods: ["GET", "POST", "DELETE", "PUT"],  //metodos que estan permitidos
    credentials: true     //si se necesitan enviar cookies
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts)
// });


//  GET  /books - Retrieve all books from the database
app.get("/api/cohorts", (req, res) => {
  Cohorts.find({})
    .then((cohorts) => {
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});


// app.get("/api/students", (req, res) => {
//   res.json(students)
// });

app.get("/api/students", (req, res) => {
  Students.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});