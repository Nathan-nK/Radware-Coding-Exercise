import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  return (
    <div className="App">
      <input className='searchBar' placeholder='Search for Images'></input>
      <button className='searchButton'>Search</button>
    </div>
  );
}

export default App;
