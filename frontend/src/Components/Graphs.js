import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import axios from 'axios';
import { Component } from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

import userIconWhite from "./../user-icon-white.png";
import userIconBlack from "./../user-icon-black.png";
import buildingIcon from "./../school-icon.png";
import userIconRed from "./../user-icon-red.png";

export default class GraphNet extends Component {
    state = {
        nodes: [],
        edges: [],
        iin: ''
    }
    numbers = {
      objects: 0,
      relations: 0
    }
    color1 = "#73ca74";
    color2 = "#b56060";
    color3 = "#FF0000";
    length = 10;

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

      container.innerHTML = text;
      return container;
    }

    defineEdgeLength = (nodeSize) => {
      if (nodeSize < 20) {
        this.length = 30
      } else if (nodeSize < 40) {
        this.length = 60
      } else {
        this.length = 100
      }
    }

    handleSubmit = (options) => {
      this.setState({iin: options.iin})
      console.log(options)
      axios.get("http://localhost:9090/relation/"+ options.iin)
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges
                
                this.defineEdgeLength(nodes.length);

                nodes.filter(e => e.main === true).map(item => (
                  item.group = 'schools',
                  item.title = this.createTitleBlockSchool(item)
                ))
                nodes.filter(e => e.main === false && e.title != this.state.iin).map(item => (
                  item.group = 'students',
                  item.title = this.createTitleBlockStudent(item)
                ))
                nodes.filter(e => e.title == this.state.iin).map(item => (
                  item.group = 'selected',
                  item.title = this.createTitleBlockStudent(item)
                ))

                this.setState({nodes, edges})
                this.numbers.objects = nodes.length
                this.numbers.relations = edges.length
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
        label: "End-date",
        font: {
          strokeWidth: 0,
          size: 10
        }
      },
      groups: {
        schools: {
          shape: "image",
          image: buildingIcon,
          size: 40,
          font: {
            color: this.color2
          }
        },
        students: {
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
        margin: {
          top: 0,
          bottom: 0
        }
      },
      height: "100%",
    };

    events = {
      select: function(event) {
        var { nodes, edges } = event;
      },
      selectNode: function(event) {
        console.log(event)
      },
      selectEdge: function(event) {
        console.log(event)
      }
    };

    manipulation = {
      deleteNode: true,
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
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
              manipulation={this.manipulation}
            />
          </div>
        <RightBar objects={this.numbers.objects} relations={this.numbers.relations}></RightBar>
        </>
      )
    }

  }
  
  