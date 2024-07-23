import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Posts from './Components/Posts';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/posts' element={<Posts/>}></Route>
        </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
