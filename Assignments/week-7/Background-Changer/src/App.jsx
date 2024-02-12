import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import './App.css'; // Import your CSS file for styling
import { background } from './store/atoms/background';

function App () {
return <div>
  <RecoilRoot>
    <ChangeBackgroundColor/>
  </RecoilRoot>
</div>
};


function ChangeBackgroundColor(){
const [backgroundColor, setBackgroundColor] = useRecoilState(background)
function handleColorChange(color){
  setBackgroundColor(color);
}
  return (
    <div className="app-container" style={{ backgroundColor }}>
     <div>
        <h1>Welcome to My App</h1>
        <p>This is the content of my app.</p>
      </div>
      <div className="background-changer">
      <button onClick={() => handleColorChange("#FF0000")} >Red</button>
        <button onClick={() => handleColorChange("#FFFF00")} >Yellow</button>
        <button onClick={() => handleColorChange("#000000")} >Black</button>
        <button onClick={() => handleColorChange("#800080")} >Purple</button>
        <button onClick={() => handleColorChange("#008000")} >Green</button>
        <button onClick={() => handleColorChange("#0000FF")} >Blue</button>
        <button onClick={() => handleColorChange("#ffffff")} >Default</button>
      </div>
    </div>
  )
}

export default App;
