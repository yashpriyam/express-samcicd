const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required:true},
    completed: {type: Boolean, default: false},
})

const Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos;