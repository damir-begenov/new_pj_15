import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar/Navbar';
import { Component } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import GraphNet from './pages/Graphs/Graphs';
import LeftBar from './Components/LeftBar/LeftBar';
import RightBar from './Components/RightBar/RightBar';
import MainPage from './pages/MainPage/MainPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import SignInPage from './pages/SignIn/SignInPage';

function App() {

  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <Routes>
          <Route path="/searchtool" element={<GraphNet/>} />
          <Route path="/" element={<MainPage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route path="/login" element={<SignInPage/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
