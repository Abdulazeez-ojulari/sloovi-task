import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import DashBoard from './components/dashboard/dashboard';

class App extends Component{
  render(){

    return(
      <React.Fragment>
        <Router>
          <Routes>
            <Route exact path='/' element={ <DashBoard /> } />
          </Routes>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
