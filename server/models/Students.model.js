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
    languages:  [String, String],
    program:[String, String],
    projects: [],
    students: [{ type: Schema.Types.ObjectId, ref: 'Student'}]
});



// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Cohorts = mongoose.model("Students", studentsSchema);

// EXPORT THE MODEL
module.exports = Cohorts;
