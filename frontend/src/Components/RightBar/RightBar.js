import React, {Component} from "react";
import ReactDOM from "react-dom";
import './RightBar.css'

class RightBar extends Component{
  render() {
    return (
      <div className='rightBar'>
        <div className="infoBlock" id="infoBlock">
          <div>
            <div className="infoBlockTitle">Информация о объекте</div>                
            <div className="nodeInfo">
              <div id="INFO1">NAME: <span id="nodeName"></span></div>
              <div id="INFO2">Acted in: <span id="nodeActedIn"></span></div>
              <div id="INFO3">Directed in: <span id="nodeDirectedIn"></span></div>
              <div id="INFO4">Produced: <span id="nodeProduced"></span></div>
              <div id="INFO5">Wrote: <span id="nodeWrote"></span></div>
              <div id="INFO6">Reviewed: <span id="nodeReviewed"></span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightBar;