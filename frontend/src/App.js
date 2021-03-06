import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import PokeApi from './pokeapi.js';
import ImageRecognition from './image_recognition.js';
import Home from './home.js';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <div className="nav">
          <span className="nav-logo">Homework 2 </span>
          <span className="nav-link"><Link to="/">Home</Link></span>
          <span className="nav-link"><Link to="/pokeapi">PokeApi</Link></span>
          <span className="nav-link"><Link to="/image_recognition">Image Recognition</Link></span>
        </div>
      </div>
      <Switch>
        <Route path="/pokeapi" component={PokeApi}/>
        <Route path="/image_recognition" component={ImageRecognition}/>
        <Route path="/" component={Home}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
