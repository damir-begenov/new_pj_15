import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Component } from "react";
import axios from 'axios';
import AllStudents from './Components/Students';
import RegisterStPage from './Components/RegisterStudent';
import SearchBar from './Components/SearchBar';
import Companies from './Components/Companies';
import CompanyDetails from './Components/CompanyDetails'
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
import GraphNet from './Components/Graphs';
import LeftBar from './Components/LeftBar';
import RightBar from './Components/RightBar';


function App() {

  return (
      <div className='App'>
        <Navbar/>
        <div className='mainSection'>

          <LeftBar />

            <GraphNet />


          <RightBar />

        </div>
      
      </div>

  )
}

export default App;
