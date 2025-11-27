const express = require("express");
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node", done: false }
];

// 1. GET /todos → List all tasks
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 2. POST /todos → Add a new task
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    done: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// 3. PATCH /todos/:id → Update done to true
app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Task not found" });
  }

  todo.done = true;

  res.json({
    message: "Task updated",
    todo
  });
});

app.listen(3001, () => console.log("Todo API running on port 3001"));