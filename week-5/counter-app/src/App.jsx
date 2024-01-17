import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "Go to gym at 11 am",
      completed: false,
    },
    {
      title: "Go to mall",
      description: "go to mall and buy groceries",
      completed: false,
    },
  ]);

  function addTodo() {
    setTodos([
      ...todos,
      {
        title: "title",
        description: "description",
      },
    ]);
  }
  return (
    <>
      <div>
        <button onClick={addTodo}>Add a todo</button>
        {todos.map(function (todo, index) {
          return (
            <Todo
              key={index}
              title={todo.title}
              description={todo.description}
            />
          );
        })}
      </div>
    </>
  );
}

function Todo(state) {
  return (
    <>
      <div>
        <h1>{state.title}</h1>
        <p>{state.description}</p>
      </div>
    </>
  );
}
export default App;
