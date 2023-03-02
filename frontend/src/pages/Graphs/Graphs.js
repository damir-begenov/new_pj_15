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

// icons
import address from '../../icons/address.png'
import company from '../../icons/company.png'
import judgeCompany from '../../icons/judge_company.png'
import judgePerson from '../../icons/judge_person.jpg'
import keyCompany from '../../icons/key_company.png'
import keyJudgePerson from '../../icons/key_judge_person.jpg'
import keyPerson from '../../icons/key_person.png'
import person from '../../icons/person.png'
import personjai from '../../icons/personjai.png'

var NoD =  [];
var EdG = [];
var Network;
var SelectedNode = {}
var SelectedEdge = {}

var onSelectNode = false;

export default class GraphNet extends Component {
    state = {
      ids: [],
      nodes: [],
      edges: [],
      temp: '',
      counter: 0,
      showActionBtn: false,
      sliderPage: 0,
      searchedNodes: []
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

    createContextMenu = (params) => {
      var canvas = Network.body.container.firstChild;

      if (canvas.getContext) {
        var ctx = canvas.getContext("webgl");

        ctx.fillStyle = "red";


        ctx.beginPath();
        ctx.arc(params.pointer.DOM.x, params.pointer.DOM.y, 50, 0, 2 * Math.PI);
        ctx.fill();
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

    Submit = async (options) => {
      this.state.isLoading = true
      this.setState({nodes: [], edges: [], ids: []})
      this.state.counter = this.state.counter+1
      
      const userSession = JSON.parse(localStorage.getItem("user"))
      console.log(userSession)
      
      let url = "http://localhost:9091/api/finpol/main/test";
      let params ={};
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
      // switch(options.mode) {
      //   case "con1":
      //     url = "http://localhost:9091/api/finpol/main/fltree";
      //     params = {person: options.name1, relations: options.relations, depth: options.depth, limit: options.limit }
      //     break;
      //   case "con2":
      //     url = "http://localhost:9091/api/finpol/main/shortestpaths";
      //     params = {person: options.name1, person2: options.name2, relations: options.relations}
      //     break;
      //   case "con3":
      //     url = "http://localhost:9091/api/finpol/main/movieperson";
      //     params = {person: options.name1, movie: options.name2, relations: options.relations}
      //     break;
      //   case "con4":
      //     url = "http://localhost:9091/api/finpol/main/movie";
      //     params = {title: options.name1, relations: options.relations}
      //     break;
      // }
      
      axios.get("http://localhost:9091/api/finpol/main/test").then(res => {
        let nodes = []
        const edges = res.data.edges;
        
        
        edges.map(item => {
          this.setEdgeSettings(item);
        })
      
        res.data.nodes.map(item => {
          this.setNodeSettings(item)
          
          nodes.push(item);
        })
        
        this.setState({nodes, edges})
        console.log(nodes)
        console.log(edges)
        
        this.state.isLoading = false

        this.setState({showActionBtn: true})
        // Network.fit({});
      })
    };

    shortOpen = () => {
      axios.get("http://localhost:9091/api/finpol/main/shortopen", {params: {id: SelectedNode.options.id }}).then(res => {
        let nodes = []
        const edgesFinal = res.data.edges;
        let edges = []
        edgesFinal.filter(item => 
          (!this.state.ids.includes(item.to) || !this.state.ids.includes(item.from))).
          map(item => {
            edges.push(item)
             // Потом с направлениями связей омогут возникнуть проблемы
        })

        edges.map(item => {
          this.setEdgeSettings(item);
        })
        res.data.nodes.map(item => {
          this.setNodeSettings(item)
          nodes.push(item);
          this.state.ids.push(item.id)
        })

        nodes.map(item => {
          item.label = item.name || item.roles[0]
        })

        Network.body.data.nodes.update(nodes)
        Network.body.data.edges.update(edges)
        Network.fit({});
      })
    }
    shortHide = () => {
      Network.body.data.nodes.remove([{id: SelectedNode.options.id}]);
    }

    setEdgeSettings = (edge) => {
      
    }

    setNodeSettings = (node) => {
      this.state.ids.push(node.id)

      if (node.properties.Type == "ЮЛ") {
        // settings for ul
        node.group = "UL"
        
        node.label = node.properties.Name;
        

      } else if (node.properties.Ulica != null) {
        // settings for propiska
        node.group = "PROPISKA"

        node.label = node.properties.Adress_propiski;

      } else {
        // settings for fl
        node.group = "FL"

        node.label = node.properties.FIO
      }

    }

    colors = {
      
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
      },
      groups: {
        // actors: {
        //   shape: "icon",
        //   icon: {
        //     face: '"Font Awesome 5 Free"',
        //     code: '\uf007',
        //     weight: 700,
        //     size: 30,
        //     color: this.colors.actorIcon
        //   },
        //   font: {
        //     color: this.colors.actorFont,
        //     weight: 300,
        //     size: 20
        //   },
        //   // physics: false
        // },
        FL: {
          shape: "circularImage",
          image: keyPerson,
          font: {
            color: "red",
            weight: 300,
            size: 20
          },
        },
        UL: {
          shape: "circularImage",
          image: company,
          font: {
            color: "white",
            weight: 300,
            size: 20
          },
        },
        PROPISKA: {
          shape: "circularImage",
          image: address,
          font: {
            color: "white",
            weight: 300,
            size: 20
          },
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

    search() {
      this.updateSearched()
      this.showSearched()
    }

    searchNext() {
      this.state.sliderPage = this.state.sliderPage + 1;
      if (this.state.sliderPage >= this.state.searchedNodes.length) {
        this.state.sliderPage = 0;
      }
      this.showSearched();
    }

    searchPrev() {
      this.state.sliderPage = this.state.sliderPage - 1;
      if (this.state.sliderPage < 0) {
        this.state.sliderPage = this.state.searchedNodes.length - 1;
      }
      this.showSearched();
    }

    updateSearched() {
      const value = document.getElementById("nodeSearchInput").value;
      const searchNodes = Object.values(Network.body.nodes).filter(elem => {
        if (elem.options.label != undefined && elem.options.label.toLowerCase().includes(value.toLowerCase())) {
          return true;
        }
      });

      this.state.sliderPage = 0;
      this.state.searchedNodes = searchNodes;
    }

    showSearched() {
      const item = this.state.searchedNodes[this.state.sliderPage];

      Network.focus(item.id, {
        scale: 1.5,
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
            <LeftBar name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
            <div className='centralBar'>
              <div className="waiterBox">
                {/* <a>Make a search</a> */}
                <i id="waiter" class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <RightBar showAction={this.state.showActionBtn}></RightBar>
          </>
          </div>
        )
      } else if (this.state.counter!==0 && this.state.nodes.length===0 && !this.state.isLoading) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
              <div className='centralBar'>
              <div className="waiterBox">
                  <a>No objects found</a>
                </div>
              </div>
            <RightBar showAction={this.state.showActionBtn}></RightBar>
          </>
          </div>
        )
      } else if (this.state.isLoading && this.state.nodes.length===0) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
              <div className='centralBar'>
                <div class="loader">
                  <div class="inner one"></div>
                  <div class="inner two"></div>
                  <div class="inner three"></div>
                </div>
              </div>
            <RightBar showAction={this.state.showActionBtn}></RightBar>
          </>
          </div>
        )
      } else { 
      return (
        <div className='mainSection'>
        <>
        <LeftBar name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
        <div className='centralBar' id="centralBar">
            <div className="nodeSearch">
              <div>
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
                  onClick={() => this.search()}></i>
              </div>
              <div>
                <i class="fa-solid fa-caret-left"
                  onClick={() => this.searchPrev()}></i>
                <i class="fa-solid fa-caret-right"
                  onClick={() => this.searchNext()}></i>
              </div>
            </div>
            <Graph
              graph={this.state}
              options={this.options}
              events={this.events}
              getNetwork={network => {
                Network = network;
                network.once("afterDrawing", function () {
                  Network.on('doubleClick', (event) => {
                    // this.createContextMenu(event)
                    console.log(event)
                  })
                });
              }}
              manipulation={this.manipulation}
              className={"graph"}
            />
        </div>
          
        <RightBar showAction={this.state.showActionBtn} shortOpen={this.shortOpen} shortHide={this.shortHide}></RightBar>
        </>
        </div>
      )
    }
  }

}

