// ./models/Book.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentsSchema = new Schema({
    
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages:  [String],
    program: String,
    background: String,
    image: String,
    cohort: [{ type: Schema.Types.ObjectId, ref: 'Cohort'}],
    projects: []
});



// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Students = mongoose.model("Student", studentsSchema);

// EXPORT THE MODEL
module.exports = Students;


