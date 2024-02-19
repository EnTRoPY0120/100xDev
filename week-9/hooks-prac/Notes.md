**_Example 1: class vs functional based hooks
Both of them does the same thing as React is backward Compatible_**

```js
// function based
import React, { useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

// Class based
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

**_Example 2: Life Cycle events in functional hooks and class based components in React_**

```js
import "./App.css";
import React, { useEffect, useState } from "react";
// functional
function App() {
  const [render, setRender] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setRender((render) => !render);
    }, 5000);
  }, []);

  return <>{render ? <MyComponent /> : <div>2nd div</div>}</>;
}

function MyComponent() {
  useEffect(() => {
    console.error("component mounted");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return <div>from inside my component</div>;
}

// class based
function App() {
  const [render, setRender] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setRender((render) => !render);
    }, 5000);
  }, []);

  return <>{render ? <MyComponent /> : <div>2nd div</div>}</>;
}

class MyComponent extends React.Component {
  componentDidMount() {
    // Perform setup or data fetching here
    console.log("component Mounted");
  }

  componentWillUnmount() {
    // Clean up (e.g., remove event listeners or cancel subscriptions)
    console.log("component Unmounted");
  }

  render() {
    // Render UI
    return <div>hello there</div>;
  }
}
```

**_Example 3: Creating a simple custom hook_**

```js
import { useEffect, useState } from "react";
import axios from "axios";

function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const value = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, n * 1000);

    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });

    return () => {
      clearInterval(value);
    };
  }, [n]);
  return { todos, loading };
}

function App() {
  const { todos, loading } = useTodos(5);

  if (loading) {
    return <div>loading.......</div>;
  }
  return (
    <>
      {todos.map((todo) => (
        <Track key={todo.id} todo={todo} />
      ))}
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}
```

**_Example 4: fetching data from the BE using a popular React library - SWR_**

```js
import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());
const fetcher = async function (url) {
  const data = await fetch(url);
  const json = await data.json();
  return json;
};

function Profile() {
  const { data, error, isLoading } = useSWR(
    "https://sum-server.100xdevs.com/todos",
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>hello, you have {data.todos.length} todos!</div>;
}
```

**_Example 4: useIsOnline custom hook_**

```js
import { useIsOnline } from "./hooks/useIsOnline";

function App() {
  const isOnline = useIsOnline();

  return (
    <div>
      {isOnline ? "You are Online" : "You are offline connect to the internet"}
    </div>
  );
}
// exported via hook folder
import { useEffect, useState } from "react";

export function useIsOnline() {
isOnline, setIsOnline] = useState(true); // Set initial state to true

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(window.navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []); // Empty dependency array to add event listeners only once

  return isOnline;
}
```

**_Example 5: useMousePointer hook_**

```js
import { useEffect, useState } from "react";

const useMousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

function App() {
  const mousePointer = useMousePointer();

  return (
    <>
      Your mouse position is {mousePointer.x} {mousePointer.y}
    </>
  );
}
```

**_Example 6: Timer based customHook_**

```js
import { useEffect, useState } from "react";

function useInterval(callback, delay) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [callback, delay]);
}

function App() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  return <>Timer is at {count}</>;
}

export default App;
```

**_Example 7: useDebounce hook_**

```js
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect
  useEffect(() => {
    axios.get("some URL for fetching the data with the debouncedValue from BE");
  }, []);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};
// exported via ./hooks/useDebounce
import { useEffect, useState } from "react";

export function useDebounce(inputValue, delay) {
  const [debounceValue, setDebounceValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setDebounceValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, delay]);
  return debounceValue;
}
```
