// import logo from './logo.svg';
import './App.css';
 // import NavBar from "./components/NavBar";
import News from './components/News';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'

export  class NavBar extends Component {
 
  render() {
    return (
      <div>
        {/* <NavBar/> */}
        <News/>
      </div>
    )
  }
}
export default NavBar


