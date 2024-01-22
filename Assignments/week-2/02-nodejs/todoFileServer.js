const express = require('express');
const fs = require('fs');
const port = process.env.port || 3000;
const app = express();
app.use(express.json());


function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}


function removeAtIndex(arr, index) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  fs.readFile('todos.json', 'utf-8', (err, data) => {
    if (err) throw err;
    res.status(200).json(JSON.parse(data));
  })
});

app.get('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data)
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send('Todo not found');
    } else {
      res.status(200).json(todos[todoIndex]);
    }
  });
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  }
  fs.readFile('todos.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.put('/todos/:id', (req, res) => {

  fs.readFile('todos.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send('Enter the right Todo to update');
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
      }
      todos[todoIndex] = updatedTodo;
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send('Todo was updated');
      });
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send('Enter the correct todo to delete');
    } else {
      const updatedTodo = removeAtIndex(todos, todoIndex);
      fs.writeFile('todos.json', JSON.stringify(updatedTodo), (err) => {
        if (err) throw err;
        res.status(200).send('Todo was deleted');
      });
    }
  });
});

app.all('/*', (req, res) => {
  res.status(404).send('Route not found');
});


app.listen(port, () => {
  console.log(`App is listening on port :${port}`);
});
