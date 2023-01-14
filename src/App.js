import React from 'react';
import './App.css';
import DragAndDrop from './DragAndDrop'

function App() {
  return (
    <div className="App">
      <h1>Getty Image Downloader</h1>
      <p className='desc'>Website to download 2048px Getty Images</p>
      <DragAndDrop />
      <h2 className='footer'>Made by Priyansu Choudhury</h2>
    </div>
  );
}

export default App;