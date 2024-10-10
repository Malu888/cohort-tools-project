const express = require("express");
const router = express.Router();



const cohortRouter = require("./cohort.routes.js");
router.use("/cohorts", cohortRouter);

const studentRouter = require("./student.routes.js");
router.use("/students", studentRouter);

module.exports = router;