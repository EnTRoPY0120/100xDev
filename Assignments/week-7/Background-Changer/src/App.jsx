import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import './App.css';
import { background } from './store/atoms/background';

function App() {
  return (
    <div className="app-container">
      <RecoilRoot>
        <ChangeBackgroundColor />
      </RecoilRoot>
    </div>
  );
}

function ChangeBackgroundColor() {
  const [backgroundColor, setBackgroundColor] = useRecoilState(background);

  function handleColorChange(color) {
    setBackgroundColor(color);
  }

  return (
    <div className="content" style={{ backgroundColor }}>
      <div>
        <h1>Welcome to My App</h1>
        <p>This is the content of my app.</p>
      </div>
      <div className='background-container'>
        <div className="background-changer">
        <button style={{ backgroundColor: "#FF0000" }} onClick={() => handleColorChange("#FF0000")}>Red</button>
        <button style={{ backgroundColor: "#FFFF00" }} onClick={() => handleColorChange("#FFFF00")}>Yellow</button>
        <button style={{ backgroundColor: "#000000",color:'white' }} onClick={() => handleColorChange("#000000")}>Black</button>
        <button style={{ backgroundColor: "#800080" }} onClick={() => handleColorChange("#800080")}>Purple</button>
        <button style={{ backgroundColor: "#008000" }} onClick={() => handleColorChange("#008000")}>Green</button>
        <button style={{ backgroundColor: "#0000FF" }} onClick={() => handleColorChange("#0000FF")}>Blue</button>
        <button style={{ backgroundColor: "#FFA500" }} onClick={() => handleColorChange("#ffffff")}>Default</button>
      </div>

      </div>
      
    </div>
  );
}

export default App;
