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

export default class GraphNet extends Component {
    state = {
        nodes: [],
        edges: [],
        temp: '',
        counter: 0,
        selectNode: (event) => {
          const selectedNode = Network.selectionHandler.selectionObj.nodes[Object.keys(Network.selectionHandler.selectionObj.nodes)[0]]
          console.log(selectedNode)

          this.createContextMenu(selectedNode.x, selectedNode.y)

        },
        oncontext: (event) => {
        } 
    }

    createContextMenu = (x, y) => {
      console.log(x, y)
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

        let subNodes = []
        res.data.nodes.map(item => {
          item.group = "selected"

          nodes.push(item);
        })
        // NoD = nodes
        // EdG = edges 

        nodes.map(item => {
          item.label = item.name || item.roles[0]
        })

        this.setState({nodes, edges})

        this.state.isLoading = false
        Network.fit({});
      })
      
    }
    handleSubmitDate = (options) => {
      this.state.iin=""
      this.state.iin2=""
      axios.get("http://localhost:9090/connection/"+ options.date+"/"+options.date2+"/"+options.iin  )
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges

                nodes.filter(e => e.main === true).map(item => (
                  item.group = 'schools'
                ))
                nodes.filter(e => e.main === false && e.bin_IIN !== this.state.iin).map(item => (
                  item.group = 'students'
                ))
                nodes.filter(e => e.bin_IIN === this.state.iin).map(item => (
                  item.group = 'selected'
                ))

                nodes.map(item => {
                  item.label = item.name
                })

                this.setState({nodes, edges})
                this.state.isLoading = false
                this.numbers.objects = nodes.length
                this.numbers.relations = edges.length
                NoD = nodes
                EdG = edges

                Network.fit({});
            })
    }

    // setChange = (event) => {
    //   this.setState({person: event.target.value})
    // }

    colors = {
      schoolColor: '#636951',
      studentColor: '#393939',
      studentColor2: '#393939',
      selectedColor: '#2D4231', //Searched IIN
      searchedColor: '#416748', //

      schoolFontColor: '#ffffff',
      studentFontColor: '#ffffff',
      studentFontColor2: '#ffffff',
      selectedFontColor: '#DE191C',
      searchedFontColor: '#99191C',

      edgeColor: '#888888'
    }

    options = {
      autoResize: true,
      edges: {
        color: this.colors.edgeColor,
        width: 1,
        arrows: "none",
        font: {
          strokeWidth: 0,
          size: 10
        }
      },
      groups: {
        actors: {
          shape: "icon",
          icon: {
            face: '"Font Awesome 5 Free"',
            code: '\uf1ad',
            weight: 700,
            size: 70,
            color: this.colors.schoolColor
          },
          font: {
            color: this.colors.schoolFontColor,
            weight: 300,
            size: 20
          },
          // physics: false
        },
        movies: {
          shape: "icon",
          icon: {
            face: '"Font Awesome 5 Free"',
            code: '\uf2bd',
            weight: 700,
            size: 50,
            color: this.colors.studentColor
          },
          font: {
            color: this.colors.studentFontColor,
            weight: 300,
          }
        },
        directors: {
          shape: "icon",
          icon: {
            face: '"Font Awesome 5 Free"',
            code: '\uf2bd',
            weight: 700,
            size: 50,
            color: this.colors.studentColor2
          },
          font: {
            color: this.colors.studentFontColor2,
            weight: 300,
          }
        },
        selected: {
          shape: "icon",
          icon: {
            face: '"Font Awesome 5 Free"',
            code: '\uf2bd',
            weight: 700,
            size: 50,
            color: this.colors.selectedColor
          },
          font: {
            color: this.colors.studentFontColor,
            weight: 300,
          }
        },
      },
      nodes: {
        font: {
          size: 14
        },
      },
      height: "100%",
    };

    manipulation = {
      deleteNode: true,
    }

    search(value) {
      console.log(value)

      const searchNodes = NoD.filter(elem => {
        if (elem.name.toLowerCase().includes(value.toLowerCase())) {
          return elem;
        }
      });

      const item = searchNodes[0];
      // document.getElementById("nodeIin").innerHTML = item.bin_IIN;
      // document.getElementById("nodeName").innerHTML = item.name;
      // document.getElementById("nodeLabel").innerHTML = item.labl;

      // for (const [key, value] of Object.entries(Network.body.nodes)) {
      //   if (value.options.group != 'selected') {
      //     value.options.icon.color = this.colors.studentColor;
      //   }

      //   if (value.options.group == 'schools') {
      //     value.options.icon.color = this.colors.schoolColor;
      //   } else if (value.options.group == 'selected') {
      //     value.options.icon.color = this.colors.selectedColor;
      //   }

      //   if (value.options.id == item.id) {
      //     value.options.icon.color = this.colors.searchedColor;
      //   }
      // }

      Network.focus(item.id, {
        scale: 2.5,
        offset: {
          x: 0,
          y: 0
        },
        // animation: {
        //   duration: 1,
        //   easingFunction: 'easeInQuad'
        // }
      })

      searchNodes.map(elem => {
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
            <RightBar objects={this.numbers.objects} relations={this.numbers.relations} current={this.current}></RightBar>
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
            <RightBar objects={this.numbers.objects} relations={this.numbers.relations} current={this.current}></RightBar>
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
            <RightBar objects={this.numbers.objects} relations={this.numbers.relations} current={this.current}></RightBar>
          </>
          </div>
        )
      } else { 
      return (
        <div className='mainSection'>
        <>
        <LeftBar iin={this.state.iin} iin2={this.state.iin2} handleSubmit={this.Submit} setIIN={this.setChange}></LeftBar>
        <div className='centralBar'>
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
              events={this.state}
              getNetwork={network => {
                Network = network;
              }}
              manipulation={this.manipulation}
            />
          </div>
        <RightBar objects={this.numbers.objects} relations={this.numbers.relations} current={this.current}></RightBar>
        </>
        </div>
      )
    }
  }

}
  
  