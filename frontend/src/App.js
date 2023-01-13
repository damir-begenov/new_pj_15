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
import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import GraphNet from './Components/Graphs';


function App() {
   
  return (
      <div className='App'>
        <Navbar/>
        <div className='mainSection'>

          <div className='leftBar'>
            <form>
              <div>
                <label for="connections">Вид связи</label>
                <select name="connections" id='connections'>
                  <option value="con1">Con1</option>
                  <option value="con2">Con2</option>
                </select>
              </div>
              <div>
                <label for="input_IIN">Введите ИИН</label>
                <input type="text" id="input_IIN" name="input_IIN" placeholder="IIN"/>
              </div>
              <div>
                <input type="checkbox" id="allCon" name="allCon" value="Все связи"/>
                <label for="allCon">Все связи</label>
              </div>
            </form>
          </div>

          <GraphNet />

          <div className='rightBar'>

          </div>

        </div>
      
      </div>

  )
}

export default App;
