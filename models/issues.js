const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Schema

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    name: String,
    priority: String,
    severity: String,
    status: String
    // date:{
    //     type: String,
    //     default: Date.now()
    // }
});

// Model
const Issues = mongoose.model('mydb', BlogPostSchema, "Issues");

module.exports = Issues;