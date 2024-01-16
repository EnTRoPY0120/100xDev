import { useState } from "react";

function App() {
  const [count, setcount] = useState(0);

  return (
    <>
      <div>
        <CustomButton count={count} setcount={setcount}></CustomButton>
      </div>
    </>
  );
}

function CustomButton(state) {
  function onClickHandler() {
    state.setcount(state.count + 1);
  }

  return (
    <>
      <button onClick={onClickHandler}>Counter {state.count} </button>
    </>
  );
}
export default App;
