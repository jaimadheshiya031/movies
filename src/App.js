import React from 'react';
import './App.css';
import Banner from './Component/Banner';
import Movies from './Component/Movies';
import Navbar from './Component/Navbar';
import Favourite from './Component/Favourite';
import { BrowserRouter as Router,Route,Routes,Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/' element={[<Banner/>,<Movies/>]} />
          <Route path='/favourite' element={<Favourite/>}/>
      </Routes>
    </Router>
  );
}

export default App;
