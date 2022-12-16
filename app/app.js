const express = require('express')
const serverless = require('serverless-http')
const Todo = require('./model/todo')
const mongoose = require('mongoose')

const app = express()
// Import the MongoDB driver
// Define our connection string. Info on where to get this will be described below. In a real world application you'd want to get this string from a key vault like AWS Key Management, but for brevity, we'll hardcode it in our serverless function here.
const MONGODB_URI =
  "mongodb+srv://yash:yash12345@cluster0.firlmgw.mongodb.net/?retryWrites=true&w=majority";


// async function connectDB() {
//   const client = await mongoose.connect(`${MONGODB_URI}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   // dbConnector = client.connections[0].db;
//   // await addCsvDataToMongoAsJson(dbConnector);
// }
// connectDB();


app.get('/hell', (req, res) => res.send('Hello World'))
app.post("/create", async (req, res) => {
    const todo = req.body.title;
    try {
      const todoData = await Todo.create({ title: todo });
      return res.status(200).send(JSON.stringify(todoData));
    } catch (error) {
      console.log(error.message);
      res.status(404).send({ error: error.message });
    }
  });
app.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const todoData = await Todo.findOne({ _id: id });
      const todoCompleted = todoData.completed ? false : true;
      const updateTodo = await Todo.updateOne(
        { _id: id },
        {
          $set: {
            completed: todoCompleted,
          },
        }
      );
      return res.status(200).send(JSON.stringify(updateTodo));
    } catch (error) {
      console.log(error.message);
      res.status(404).send({ error: error.message });
    }
  });
app.get('/todos',  async(req, res) => {
    const todos = await Todo.find({});
    res.json({success:true, todos})
})
app.delete("/delete", async (req, res) => {
    const id = req.body.todoId;
    try {
      const todoData = await Todo.deleteOne({ _id: id });
      return res.status(200).send(JSON.stringify(todoData));
    } catch (error) {
      console.log(error.message);
      res.status(404).send({ error: error.message });
    }   
  });

// app.listen(3000, () => console.log('Running on port 3000'))
module.exports.handler = serverless(app)