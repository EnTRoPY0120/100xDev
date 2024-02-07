**_Example 1: Routing using react-router-dom _**

```js
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Landing } from "./components/Landing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

**_Example 2: Client Side routing using useNavigate() hook_**

```js
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Landing } from "./components/Landing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Landing page
        </button>

        <button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
export default App;
```

**_Example 3: Lazy loading a route _**

```js
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import React, { Suspense } from "react";
const Dashboard = React.lazy(() => import("./components/Dashboard"));
function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar />

        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"loading..."}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"loading..."}>
                <Landing />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Landing page
        </button>

        <button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
export default App;
```

**_Example 4: What is Prop drilling_**

```js
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Count count={count} />
    </div>
  );
}

function Count({ count, setCount }) {
  // As you can see that only the child component needs the setCount prop so to facilitate that we
  // passing down/drilling down the prop through the component tree as the Least Common Ancestor(LCA)
  // can be far removed from the component that need the data. This can be become very verbose
  // lifting the state that high will lead to a situation called prop drilling
  //
  return (
    <div>
      {count}
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function Buttons({ count, setCount }) {
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}
export default App;
```

**_Example 5: Using Context api and useContext hook() to fix propdrilling and teleport the data to the
component directly_**

```js
import { useContext, useState } from "react";
import { CountContext } from "./context";

function App() {
  const [count, setCount] = useState(0);
  // wrap anything that want you want to use the teleported value inside a provider
  return (
    <div>
      <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider>
    </div>
  );
}

function Count({ setCount }) {
  return (
    <div>
      <CountRenderer />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CountRenderer() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}
export default App;
```
