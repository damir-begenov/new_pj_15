import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import axios from 'axios';
import { Component } from "react";


class GraphsStud extends Component {
    state = {
        nodes: [],
        edges: []
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:9090/persons")
            .then(res => {
                const nodes = res.data.nodes
                this.setState({nodes})
            })
    }
    getNodes() {
        return this.state.nodes
    }
}
async function update() {
    // var nodes = {}
    // await axios.get("http://127.0.0.1:9090/persons")
    //     .then(res => {
    //         nodes = res.data.nodes
    //     })
    // return nodes;
    return (await axios.get("http://127.0.0.1:9090/persons")).data.nodes;
}
async function doSomething(nodes) {
    let result = await update();
    nodes = result
    return result;
}

export default class GraphNet extends Component {
    state = {
        nodes: [],
        edges: []
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:9090/persons")
            .then(res => {
                const nodes = res.data.nodes
                const edges = res.data.edges
                nodes.filter(e => e.main == true).map(item => (
                    item.color = "red"
                )
                )
                this.setState({nodes, edges})
            })
    }

    graph = {
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
    }
    options = {
        autoResize: true,
        edges: {
            color: "white",
            arrows: "diamond"
        },
        nodes: {
            shape: "circle"
        },
        height: "700px",
      };
    events = {
            select: function(event) {
              var { nodes, edges } = event;
            }
          };
    // let node = doSomething();
    // console.log(node)
    // const graph = {
    //     nodes: [
    //       { id: 1, label: "Node 1", title: "node 1 tootip text", first:true,  color: "red",  shape: "circle" },
    //       { id: 2, label: "Node 2", title: "node 2 tootip text",  shape: "circle" },
    //       { id: 3, label: "Node 3", title: "node 3 tootip text",  shape: "circle" },
    //       { id: 5, label: "Node 5", title: "node 5 tootip text", last:true,  color: "red",  shape: "circle" }
    //     ],
    //     edges: [
    //       { from: 1, to: 2, color: "white" },
    //       { from: 1, to: 3, color: "white" },
    //       { from: 2, to: 3, color: "white" },
    //       { from: 2, to: 5, color: "white" }
    //     ]
    // };
    // const options = {
    //         autoResize: true,
    //         edges: {
    //           color: "#000000"
    //         },
    //         height: "700px"
    //       };
    // const events = {
    //         select: function(event) {
    //           var { nodes, edges } = event;
    //         }
    //       };
    render() {
        return (
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
    )
    }

  }
  
  