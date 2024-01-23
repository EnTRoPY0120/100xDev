**_Example 1 : How to render a single component using memo_**

```js
import React, { useState } from "react";
function App() {
  const [title, setTitle] = useState("My name is VJ");

  function updateTitle() {
    setTitle("My name is " + Math.random());
  }

  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>
      <Header title={title} />
      <Header title="Hi there how are u?" />
      <Header title="Hi there how are u?" />
      <Header title="Hi there how are u?" />
    </div>
  );

  /* We can push the state down from the root to the common ancestor of the rendering

- children so that the children aren't re-rendered unnecessarily or else for simplicity
- use React.memo which let's you skip re-rendering a component when its props are unchanged

function HeaderWithButton() {
const [firstTitle, setFirstTitle] = useState("My name is VJ");

function updateTitle() {
setFirstTitle("My name is " + Math.random());
}

return (
<>
<button onClick={updateTitle}>Update the button</button>
<Header title={firstTitle} />
</>
);
}
*/
}

const Header = React.memo(function ({ title }) {
  return <div>{title}</div>;
});

export default App;
```

**_Example 2_**

- A todo list

```js
let counter = 4;
function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Go to gym",
      description: "Go to gym at 11am",
    },
    {
      id: 2,
      title: "Go to shop",
      description: "Go buy groceries for bread omlette",
    },
    {
      id: 3,
      title: "Date ",
      description: "Have a date at 6pm",
    },
  ]);

  function addTodo() {
    setTodos([
      ...todos,
      {
        id: counter++,
        title: Math.random(),
        description: Math.random(),
      },
    ]);
  }
  return (
    <div>
      <button onClick={addTodo}>Add a new Todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{description}</h5>
    </div>
  );
}
```

**_Example 3: How to use the wrapper class_**

```js
function App() {
  return (
    <div>
      <CardWrapper>Hi , there !!!!</CardWrapper>
    </div>
  );
}
function CardWrapper({ children }) {
  return <div style={{ border: "2px Solid black" }}>{children}</div>;
}
```

**_Example 4 : useEffect() hook_**

```js
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
    }, 10000);
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          description={todo.description}
        ></Todo>
      ))}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
}
```
