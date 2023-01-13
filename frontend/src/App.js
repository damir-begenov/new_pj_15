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


function App() {
    const graph = {
        nodes: [
          { id: 1, label: "Node 1", title: "node 1 tootip text", first:true,  color: "red",  shape: "circle" },
          { id: 2, label: "Node 2", title: "node 2 tootip text",  shape: "circle" },
          { id: 3, label: "Node 3", title: "node 3 tootip text",  shape: "circle" },
          { id: 5, label: "Node 5", title: "node 5 tootip text", last:true,  color: "red",  shape: "circle" }
        ],
        edges: [
          { from: 1, to: 2, color: "white" },
          { from: 1, to: 3, color: "white" },
          { from: 2, to: 3, color: "white" },
          { from: 2, to: 5, color: "white" }
        ]
      };
    const options = {
          autoResize: true,
          layout: {
            network: true
          },
          edges: {
            color: "#000000"
          },
          height: "1000px"
        };
    const events = {
            select: function(event) {
              var { nodes, edges } = event;
            }
          };
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

          <div className='centralBar'>
            <Graph
              graph={graph}
              options={options}
              events={events}
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
          </div>

          <div className='rightBar'>

          </div>

        </div>
      
      </div>

  )
}

export default App;
