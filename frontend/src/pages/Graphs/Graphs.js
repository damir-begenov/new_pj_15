import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import axios from 'axios';
import { Component } from "react";
import LeftBar from "../../Components/LeftBar/LeftBar";
import RightBar from "../../Components/RightBar/RightBar";

import './../../Loader.css'
import './Graphs.css'

import userIconWhite from "./../../user-icon-white.png";
import userIconBlack from "./../../user-icon-black.png";
import buildingIcon from "./../../eclipse-1.png";
import userIconRed from "./../../user-icon-red.png";

import useFetch from "../../hooks/useFetch.js";

var NoD =  [];
var EdG = [];
var Network;
var SelectedNode = {}
var SelectedEdge = {}

var onSelectNode = false;

export default class GraphNet extends Component {
    state = {
        nodes: [],
        edges: [],
        temp: '',
        counter: 0
    }

    assignInfoBlock = (options) => {
      const infoBlock = document.querySelector(".nodeInfo")
      Object.entries(options).forEach(entry => {
        const [key, value] = entry;
        const info = document.createElement("div")
        info.innerHTML = `${key.toUpperCase()}: <span>${value}</span>`

        infoBlock.appendChild(info)
      });
    }

    createContextMenu = (x, y) => {
      const contextMenu = document.createElement("div")
      contextMenu.classList.add("nodeContextMenu")
      contextMenu.style.left = x+"px"
      contextMenu.style.top = y+"px"

      Network.focus(SelectedNode.id, {
        scale: 0.6,
        offset: {
          x: 0,
          y: 0
        }
      })

      Network.canvas.body.container.style.position = "relative"
      Network.canvas.body.container.appendChild(contextMenu)
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

    Submit = async (options) => {
      this.state.isLoading = true
      this.setState({nodes: [], edges: []})
      this.state.counter = this.state.counter+1

      let url = "";
      switch(options.mode) {
        case "con1":
          url = "http://localhost:9091/persons/" + options.iin + "/2/9";
          break;
        case "con2":
          url = "http://localhost:9091/shortestpaths/" + options.iin + "/" + options.iin2;
          break;
        case "con3":
          url = "http://localhost:9091/ogreturn/";
          break;
        case "con4": 
          url = "http://localhost:9091/ogreturn/";
          break
        case "con5":
          url = "http://localhost:9091/ogreturn/";
          break;
      }
      console.log(url)

      this.movies(url);
    };

    movies = (url) => {
      axios.get(url).then(res => {
        let nodes = []
        const edges = res.data.edges;

        edges.map(item => {
          this.setEdgeSettings(item);
        })

        let subNodes = []
        res.data.nodes.map(item => {
          this.setNodeSettings(item)
          nodes.push(item);
        })

        nodes.map(item => {
          item.label = item.name || item.roles[0]
        })

        this.setState({nodes, edges})

        this.state.isLoading = false
        Network.fit({});
      })
      
    }

    setEdgeSettings = (edge) => {
      edge.label = edge.type
      Object.assign(edge, {properties: edge.properties})

      if (edge.type === 'acted_in') {
        Object.assign(edge, {font: {color: this.colors.actedInEdge}})
        Object.assign(edge, {color: this.colors.actedInEdge})

      } else if (edge.type == 'directed') {
        Object.assign(edge, {font: {color: this.colors.directedEdge}})
        Object.assign(edge, {color: this.colors.directedEdge})

      } else if (edge.type == 'reviewed') {
        Object.assign(edge, {font: {color: this.colors.reviewEdge}})
        Object.assign(edge, {color: this.colors.reviewEdge})

      } else if (edge.type == 'wrote') {
        Object.assign(edge, {font: {color: this.colors.wroteEdge}})
        Object.assign(edge, {color: this.colors.wroteEdge})

      } else if (edge.type == 'produced') {
        Object.assign(edge, {font: {color: this.colors.producedEdge}})
        Object.assign(edge, {color: this.colors.producedEdge})

      } else if (edge.type == 'follows') {
        Object.assign(edge, {font: {color: this.colors.followsEdge}})
        Object.assign(edge, {color: this.colors.followsEdge})

      }
    }

    setNodeSettings = (node) => {
      if (node.description === "") {
        // settings for actors
        node.group = "actors"
        node.mass = 5
        

      } else {
        // settings for movies
        node.group = "movies"
        node.physics = false

      }

    }

    // setChange = (event) => {
    //   this.setState({person: event.target.value})
    // }

    colors = {
      actorIcon: '#cfcc53',
      actorFont: '#cfcc53',

      movieIcon: '#1c4709',
      movieFont: '#1c4709',

      wroteEdge: 'yellow',
      reviewEdge: 'blue',
      directedEdge: 'green',
      actedInEdge: 'red',
      producedEdge: 'pink',
      followsEdge: 'purple'
    }

    options = {
      autoResize: true,
      edges: {
        // color: 'white',
        length: 100,
        width: 1,
        selectionWidth: 5,
        arrows: {
          to: true,
        },
        smooth: {
          "type": "dynamic",
          "forceDirection": "none",
          roundness: 0.5
        }, 
        font: {
          strokeWidth: 0,
          size: 10,
          align: "top"
        },
      },
      physics: {
        enabled: true,
        barnesHut: {
          springConstant: 0,
          theta: 0.5,
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        maxVelocity: 25,
        minVelocity: 0,
        solver: "barnesHut",
        timestep: 0.5,
        wind: { x: 0, y: 0 }

        // forceAtlas2Based: {
        //   gravitationalConstant: -26,
        //   centralGravity: 0.005,
        //   springLength: 230,
        //   springConstant: 0.18,
        //   avoidOverlap: 1.5
        // },
        // maxVelocity: 146,
        // solver: 'forceAtlas2Based',
        // timestep: 0.35,
        // stabilization: {
        //   enabled: true,
        //   iterations: 1000,
        //   updateInterval: 25
        // }
      },
      groups: {
        actors: {
          shape: "icon",
          icon: {
            face: '"Font Awesome 5 Free"',
            code: '\uf007',
            weight: 700,
            size: 30,
            color: this.colors.actorIcon
          },
          font: {
            color: this.colors.actorFont,
            weight: 300,
            size: 20
          },
          // physics: false
        },
        movies: {
          shape: "icon",
          icon: {
            face: '"Font Awesome 5 Free"',
            code: '\uf03d',
            weight: 700,
            size: 50,
            color: this.colors.movieIcon
          },
          font: {
            color: this.colors.movieFont,
            weight: 300,
          }
        }
      },
      nodes: {
        font: {
          size: 14
        },
      },
      height: "100%",

      layout: {
        randomSeed: 1,
        improvedLayout: true,
      }
    };

    manipulation = {
      deleteNode: true,
    }

    events = {
      selectNode: (event) => {
        SelectedNode = Network.selectionHandler.selectionObj.nodes[Object.keys(Network.selectionHandler.selectionObj.nodes)[0]]
        onSelectNode = true

        const infoBlock = document.querySelector(".nodeInfo")
        infoBlock.innerHTML = ""

        this.assignInfoBlock({
          name: SelectedNode.options.name, 
          year: SelectedNode.options.year
        })

        if (SelectedNode.options.group == "movies") {
          this.assignInfoBlock({description: SelectedNode.options.description})
        }
      }, 
      deselectNode: (event) => {
        onSelectNode = false
      },
      selectEdge: (event) => {
        SelectedEdge = Network.selectionHandler.selectionObj.edges[Object.keys(Network.selectionHandler.selectionObj.edges)[0]]

        if (onSelectNode == true) return

        const infoBlock = document.querySelector(".nodeInfo")
        infoBlock.innerHTML = ""

        const fromNode = Network.body.nodes[SelectedEdge.options.from]
        const toNode = Network.body.nodes[SelectedEdge.options.to]

        let edgeType = SelectedEdge.options.label.replace('_', ' ');
        edgeType = edgeType.charAt(0).toUpperCase() + edgeType.slice(1)

        let edgeProperties = [];
        Object.entries(this.state.edges).forEach(item => {
          if (item[1].id == SelectedEdge.id) {
            edgeProperties = item[1].properties;
          }
        });

        let edgeRoles = "none"
        Object.entries(edgeProperties).forEach(item => {
          console.log(item)
          if (edgeRoles == "none") edgeRoles = item[1].value
          else edgeRoles += ", " + item[1].value
        })

        this.assignInfoBlock({
          from: fromNode.options.name,
          to: toNode.options.name,
          type: edgeType,
          roles: edgeRoles
        })
      },
    }

    search(value) {
      const searchNodes = Object.values(Network.body.nodes).filter(elem => {
        if (elem.options.label != undefined && elem.options.label.toLowerCase().includes(value.toLowerCase())) {
          // console.log(elem.options.label)
          return true;
        }
      });

      const item = searchNodes[0];

      Network.focus(item.id, {
        scale: 2.5,
        offset: {
          x: 0,
          y: 0
        },
      })
    }

    render() {
      if (this.state.counter===0 && !this.state.isLoading) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar iin={this.state.iin} iin2={this.state.iin2} handleSubmit={this.Submit} setIIN={this.setChange}></LeftBar>
            <div className='centralBar'>
              <div className="waiterBox">
                {/* <a>Make a search</a> */}
                <i id="waiter" class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <RightBar></RightBar>
          </>
          </div>
        )
      } else if (this.state.counter!==0 && this.state.nodes.length===0 && !this.state.isLoading) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar iin={this.state.iin} iin2={this.state.iin2} handleSubmit={this.Submit} setIIN={this.setChange}></LeftBar>
              <div className='centralBar'>
              <div className="waiterBox">
                  <a>No objects found</a>
                </div>
              </div>
            <RightBar></RightBar>
          </>
          </div>
        )
      } else if (this.state.isLoading && this.state.nodes.length===0) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar iin={this.state.iin} iin2={this.state.iin2} handleSubmit={this.Submit} setIIN={this.setChange}></LeftBar>
              <div className='centralBar'>
                <div class="loader">
                  <div class="inner one"></div>
                  <div class="inner two"></div>
                  <div class="inner three"></div>
                </div>
              </div>
            <RightBar></RightBar>
          </>
          </div>
        )
      } else { 
      return (
        <div className='mainSection'>
        <>
        <LeftBar iin={this.state.iin} iin2={this.state.iin2} handleSubmit={this.Submit} setIIN={this.setChange}></LeftBar>
        <div className='centralBar' id="centralBar">
            <div className="nodeSearch">
              <input type="text" id="nodeSearchInput" placeholder="Еще один поиск.." 
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    if(event.target.value != "") {
                      this.search(event.target.value)
                    } else {
                      Network.fit({});
                    }
                  }
                }}
                onChange={event => {
                  if (event.target.value == "") {
                    Network.fit({});
                  }
                }}/>
              <i class="fa-solid fa-magnifying-glass"
                onClick={() => this.search(document.getElementById("nodeSearchInput").value)}></i>
            </div>
            <Graph
              graph={this.state}
              options={this.options}
              events={this.events}
              getNetwork={network => {
                Network = network;
              }}
              manipulation={this.manipulation}
              className={"graph"}
            />
        </div>
          
        <RightBar></RightBar>
        </>
        </div>
      )
    }
  }

}
  
  