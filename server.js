const express = require('express'); // 🌐 Express setup
const mongoose = require('mongoose'); // 🗃️ MongoDB connection
const cors = require('cors'); // 🌍 Allow cross-origin requests
require('dotenv').config(); // 🔒 Manage environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // 🌐 Allow frontend-backend communication
app.use(express.json()); // 📝 Parse incoming JSON requests

// 🔌 Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 📋 Define the Todo schema and model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// 🚀 API Endpoints

// 📝 GET: Fetch all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ➕ POST: Add a new todo
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});

// ✅ PUT: Update a todo's status
app.put('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = req.body.completed;
  await todo.save();
  res.json(todo);
});

// ❌ DELETE: Remove a todo
app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

// 🔊 Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
