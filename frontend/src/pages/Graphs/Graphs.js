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
        select: (event) => {
          var { nodes, edges } = event;

          if (nodes.length > 0) {
            let node = NoD.filter(e => e.id === event.nodes[0])[0]

            console.log(node)

            // if (node.group == 'schools') {
            //   document.getElementById("INFO1").innerHTML = `BIN: <span id="nodeIin">${node.bin_IIN}</span>`;
            //   document.getElementById("INFO4").innerHTML = "";
            //   document.getElementById("INFO5").innerHTML = "";
            // } else {
            //   document.getElementById("INFO1").innerHTML = `IIN: <span id="nodeIin">${node.bin_IIN}</span>`;

            //   let startDateText = "START DATE: ";
            //   let endDateText = "END DATE: ";

            //   EdG.filter(item => item.from == node.id).map(item => {
            //     startDateText += `<span id="nodeStart">${item.start_date.substring(0, 10)}</span>`
            //     endDateText += `<span id="nodeStart">${item.end_date.substring(0, 10)}</span>`
            //   })
              
            //   let edge = EdG.filter(e => e.id === event.edges[0])
            //   document.getElementById("INFO4").innerHTML = startDateText;
            //   document.getElementById("INFO5").innerHTML = endDateText;
            // }

            // document.getElementById("nodeName").innerHTML = node.name;
            // document.getElementById("nodeLabel").innerHTML = node.labl;

            
          } else {

          }
          
          
        },
        oncontext: (event) => {
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

    nodeInfo(item) {
      let text = "";

      text += `<h3>School</h3>`;
      text += `<p><span>id:</span> ${item.id}</p>`;
      text += `<p><span>name:</span> ${item.label}</p>`;
      text += `<p><span>BIN:</span> ${item.newTitle}</p>`;
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
    Submit = async (options) => {
      this.state.isLoading = true
      this.setState({nodes: [], edges: []})
      this.state.counter = this.state.counter+1

      this.movies(options);
    };

    movies = (options) => {

      axios.get("http://localhost:9090/persons/").then(res => {
        let nodes = []
        const edges = res.data.edges;

        res.data.nodes.map(item => {
          let node = item
          node.group = "actors"

          nodes.push(node);

        //   item.acted_ins.map(element => {
        //     element["name"] = element.movie.title
        //     node.group = "movies"
        //     nodes.push(element)
        //   });

        //   item.directeds.map(element => {
        //     element["name"] = element.movie.title
        //     node.group = "movies"
        //     nodes.push(element)
        //   });
        })

        NoD = nodes
        EdG = edges 
        this.state.isLoading = false

        nodes.map(item => {
          item.label = item.name
        })
        this.setState({nodes, edges})
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
                this.state.nodes.map(item => (
                  item.onclick = this.nodeInfo(item)
                ))

                Network.fit({});
            })
    }

    setChange = (event) => {
      this.setState({iin: event.target.value})
    }

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
  
  