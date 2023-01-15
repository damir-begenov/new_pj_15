import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import axios from 'axios';
import { Component } from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

export default class GraphNet extends Component {
    state = {
        nodes: [],
        edges: [],
        iin: ''
    }
    numbers = {
      persons: 0,
      schools: 0
    }
    color1 = "#73ca74";
    color2 = "#b56060";
    componentDidMount() {
        axios.get("http://localhost:9090/relation/"+this.state.iin)
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges
                nodes.filter(e => e.main === true).map(item => (
                    item.color = this.color2
                ))
                nodes.filter(e => e.main === false).map(item => (
                  item.color= this.color1
                ))
                this.setState({nodes, edges})
            })
    }
    options = {
        autoResize: true,
        edges: {
            color: "white",
            arrows: "none"
        },
        nodes: {
            shape: "circle"
        },
        height: "100%",
      };
    events = {
            select: function(event) {
              var { nodes, edges } = event;
            }
          };
    handleSubmit = (event) => {
      this.setState({iin: event.target.value})
      axios.get("http://localhost:9090/relation/"+ event.target.value)
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges
                nodes.filter(e => e.title == this.state.iin).map(item => (
                  item.color = 'red'
                ))
                nodes.filter(e => e.main === true).map(item => (
                    item.color = this.color2
                ))
                nodes.filter(e => e.main === false && e.title != this.state.iin).map(item => (
                  item.color= this.color1
                ))
                this.setState({nodes, edges})
            })
    }
    setChange = (event) => {
      this.setState({iin: event.target.value})
      console.log(this.state.iin)
    }
    render() {
        return (
          <>
          <LeftBar iin={this.state.iin} handleSubmit={this.handleSubmit} setIIN={this.setChange}></LeftBar>
          <div className='centralBar'>
              <Graph
                graph={this.state}
                options={this.options}
                events={this.events}
                getNetwork={network => {
                  //  if you want access to vis.js network api you can set the state in a parent component using this property
                }}
              />
            </div>
          <RightBar></RightBar>
          </>

    )
    }

  }
  
  