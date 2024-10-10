const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

//MONGOOSE

mongoose
  .connect("mongodb://localhost:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const Cohort = require("./models/Cohorts.models");
const Student = require("./models/Students.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"], //metodos que estan permitidos
    credentials: true, //si se necesitan enviar cookies
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

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.status(202).json(cohorts);
    })
    .catch((error) => {
      next(error)
    });
});

// app.get("/api/students", (req, res) => {
//   res.json(students)
// });

app.get("/api/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.status(202).json(students);
    })
    .catch((error) => {
        next(error);
    });
});

app.post("/api/students", async (req, res) => {
  try {
    const response = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      projects: req.body.projects,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});
//recuperar todos los estudiantes en la coleccion de la base de datos
app.get('/api/students/cohort/:cohortId', async (req, res) => {
  try{
    console.log(req.params.cohortId)
    const response= await Student.find({cohort: req.params.cohortId})
    res.status(200).json(response)
  }catch (error){
    next(error);
  }
})
//recuperar un estudiante especifico
app.get("/api/students/:studentId", async (req, res)=>{
  try{
    const response= await Student.findById(req.params.studentId)
    res.status(200).json(response)
  }catch (error){
    next(error)
  }
})
//actualiza un estudiante especifico

app.put("/api/students/:studentId", async (req, res)=>{
  try {
    const response= await Student.findByIdAndUpdate(req.params.studentId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program:req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects
    }, {new: true})
  res.status(202).json(response)
     } catch (error) {
      next(error)
}
})



//elimina un estudiante especifico
app.delete("/api/students/:studentId", async (req, res)=>{
  try{
    await Student.findByIdAndDelete(req.params.studentId)
    res.status(200).send()
    
  }catch (error){
    next(error)
  }
})
  

//crea un nuevo grupo
app.post("/api/cohort", async (req, res)=>{
try {
  const response = await Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
  res.status(201).json(response)
} catch (error) {
  next(error)
}
}) 

//recuperar un grupo especifico
app.get("/api/cohorts/:cohortId", async (req, res)=>{
  try{
    const response= await Cohort.findById(req.params.cohortId)
    res.status(200).json(response)
  }catch (error){
    next(error)
  }
})
//actualiza un grupo especifico
app.put("/api/cohorts/:cohortId", async (req, res)=>{
  try{
      const response= await Cohort.findByIdAndUpdate(req.params.cohortId, {
          cohortSlug: req.body.cohortSlug,
          cohortName: req.body.cohortName,
          program: req.body.program,
          format: req.body.format,
          campus: req.body.campus,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          inProgress: req.body.inProgress,
          programManager: req.body.programManager,
          leadTeacher: req.body.leadTeacher,
          totalHours: req.body.totalHours
      }, {new: true})
      res.status(202).json(response)
  }catch(error){
    next(error)
  }
})

//elimina un grupo especifico
app.delete("/api/cohorts/:cohortId", async (req, res)=>{
  try{
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.status(200).send()
    
  }catch (error){
    next(error)
  }
})

 //GESTOR DE ERRORES

const errorHandling= require("./error-handlers")
errorHandling(app)



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
