// ./models/Book.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const cohortsSchema = new Schema({
    
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: String,
    endDate: String,
    programManager: String,
    leadTeacher :String,
    totalHours: Number,
    students: [{ type: Schema.Types.ObjectId, ref: 'Student'}]
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
//const Cohorts = mongoose.model("Cohorts", cohortsSchema);

// EXPORT THE MODEL
//module.exports = Cohorts;
module.exports = mongoose.model('Cohort', cohortsSchema);
