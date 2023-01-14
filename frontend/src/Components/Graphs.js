import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";

function GraphNet() {
      const color1 = "#73ca74";
      const color2 = "#b56060";

      const graph = {
          nodes: [
            { id: 1, label: "Node 1", title: "node 1 tootip text", first:true,  color: color1,  shape: "circle"},
            { id: 2, label: "Node 2", title: "node 2 tootip text",  shape: "circle", color: color2 },
            { id: 3, label: "Node 3", title: "node 3 tootip text",  shape: "circle", color: color2 },
            { id: 5, label: "Node 5", title: "node 5 tootip text", last:true,  color: color1,  shape: "circle" }
          ],
          edges: [
            { from: 1, to: 2, color: "white" },
            { from: 1, to: 3, color: "white" },
            { from: 2, to: 3, color: "white" },
            { from: 2, to: 5, color: "white" }
          ]
        };
      const options = {
            autoResize: true,
            layout: {
              network: true
            },
            edges: {
              color: "#000000"
            },
            height: "1000px"
          };
      const events = {
              select: function(event) {
                var { nodes, edges } = event;
              }
            };
    return (
      <div>
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>  
    )
  }
  
  export default GraphNet;