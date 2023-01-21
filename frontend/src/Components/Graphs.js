import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import axios from 'axios';
import { Component } from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

import userIconWhite from "./../user-icon-white.png";
import userIconBlack from "./../user-icon-black.png";
import buildingIcon from "./../eclipse-1.png";
import userIconRed from "./../user-icon-red.png";

var NoD =  [];
var EdG = [];

export default class GraphNet extends Component {
    state = {
        nodes: NoD,
        edges: [],
        iin: '',
        iin2: '',
        select: function(event) {
          var { nodes, edges } = event;
        },
        selectNode: function(event) {
          let item = NoD.filter(e => e.id === event.nodes[0])[0]
          document.getElementById("nodeIin").innerHTML = item.bin_IIN;
          document.getElementById("nodeName").innerHTML = item.name;
          document.getElementById("nodeLabel").innerHTML = item.labl;
        },
        selectEdge: function(event) {
          let item = EdG.filter(e=> e.id === event.edges[0])[0]
          console.log(item.start_date) 
        }        
    }
    numbers = {
      objects: 0,
      relations: 0
    }
    current = {
      iin: '',
      name: '',
      relations: [],
      label: ''
    }
    color1 = "#73ca74";
    color2 = "#b56060";
    color3 = "#FF0000";

    nodeInfo(item) {
      let text = "";

      text += `<h3>School</h3>`;
      text += `<p><span>id:</span> ${item.id}</p>`;
      text += `<p><span>name:</span> ${item.label}</p>`;
      text += `<p><span>BIN:</span> ${item.title}</p>`;
      document.getElementById("infoIIN").innerHTML = text;
    }
    createTitleBlockStudent(item) {
      const container = document.createElement("div");
      container.classList.add("nodeTitleBlock");

      let text = "";

      text += `<h3>Student</h3>`;
      text += `<p><span>id:</span> ${item.id}</p>`;
      text += `<p><span>name:</span> ${item.label}</p>`;
      text += `<p><span>IIN:</span> ${item.title}</p>`;

      container.innerHTML = text;
      return container;
    }
    createTitleBlockSchool(item) {
      const container = document.createElement("div");
      container.classList.add("nodeTitleBlock");

      let text = "";

      text += `<h3>School</h3>`;
      text += `<p><span>id:</span> ${item.id}</p>`;
      text += `<p><span>name:</span> ${item.label}</p>`;
      text += `<p><span>BIN:</span> ${item.title}</p>`;
      // document.getElementById("infoIIN").innerHTML = text;

      container.innerHTML = text;
      return container;
    }
    handleSubmitConn = (options) => {
      this.setState({iin: options.iin, iin2: options.iin2})

      axios.get("http://localhost:9090/connection/"+ options.iin + "/" + options.iin2 )
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges
                
                nodes.filter(e => e.main === true).map(item => (
                  item.group = 'schools'
                  // item.title = this.createTitleBlockSchool(item)
                ))
                nodes.filter(e => e.main === false && e.bin_IIN !== this.state.iin && e.bin_IIN !== this.state.iin2).map(item => (
                  item.group = 'students2'
                  // item.title = this.createTitleBlockStudent(item)
                ))
                nodes.filter(e => e.bin_IIN === this.state.iin || e.bin_IIN === this.state.iin2).map(item => (
                  item.group = 'selected'
                  // item.title = this.createTitleBlockStudent(item)
                ))

                nodes.map(item => {
                  item.label = item.name
                })
    
                this.setState({nodes, edges})
                this.numbers.objects = nodes.length
                this.numbers.relations = edges.length
                NoD = nodes
                EdG = edges
                this.state.nodes.map(item => (
                  item.onclick = this.nodeInfo(item)
                ))

            })
    }
    handleSubmit = (options) => {
      this.setState({iin: options.iin})
      axios.get("http://localhost:9090/connection/"+ options.iin )
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges

                nodes.filter(e => e.main === true).map(item => (
                  item.group = 'schools'
                  // item.title = this.createTitleBlockSchool(item)
                ))
                nodes.filter(e => e.main === false && e.bin_IIN !== this.state.iin).map(item => (
                  item.group = 'students'
                  // item.title = this.createTitleBlockStudent(item)
                ))
                nodes.filter(e => e.bin_IIN === this.state.iin).map(item => (
                  item.group = 'selected'
                  // item.title = this.createTitleBlockStudent(item)
                ))
                nodes.map(item => {
                  item.label = item.name
                })
                this.setState({nodes, edges})
                this.numbers.objects = nodes.length
                this.numbers.relations = edges.length
                NoD = nodes
                EdG = edges
                this.state.nodes.map(item => (
                  item.onclick = this.nodeInfo(item)
                ))
            })
    }

    setChange = (event) => {
      this.setState({iin: event.target.value})
      // console.log(this.state.iin)
    }

    options = {
      autoResize: true,
      edges: {
        color: "#bfbfbf",
        width: 1,
        // length: 40,
        arrows: "none",
        font: {
          strokeWidth: 0,
          size: 10
        }
      },
      groups: {
        schools: {
          shape: "circle",
          size: 50,
          color: "#00FF00",
          font: {
            color: "#000"
          },
        },
        students: {
          shape: "image",
          image: userIconWhite,
          size: 20,
          font: {
            color: this.color1
          }
        },
        students2: {
          shape: "image",
          image: userIconWhite,
          size: 20,
          font: {
            color: this.color1
          }
        },
        selected: {
          shape: "image",
          image: userIconRed,
          size: 30,
          font: {
            color: this.color3
          }
        },
      },
      nodes: {
        font: {
          color: this.color1,
          size: 20
        },
      },
      height: "100%",
      selectable: true
    };


    manipulation = {
      deleteNode: true,
    }

    render() {
      return (
        <>
        <LeftBar iin={this.state.iin} iin2={this.state.iin2} handleSubmit={this.handleSubmit} handleSubmitConn={this.handleSubmitConn} setIIN={this.setChange}></LeftBar>
        <div className='centralBar'>
            <div className="nodeSearch">
              <input type="text"/>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <Graph
              graph={this.state}
              options={this.options}
              events={this.state}
              getNetwork={network => {
                network.on('zoom', event => {
                  network.moveTo({

                  });
                })
              }}
              manipulation={this.manipulation}
            />
          </div>
        <RightBar objects={this.numbers.objects} relations={this.numbers.relations} current={this.current}></RightBar>
        </>
      )
    }

  }
  
  