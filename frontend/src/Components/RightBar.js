import React, {Component} from "react";
import ReactDOM from "react-dom";

class RightBar extends Component{
  render() {
    return (
      <div className='rightBar'>
        <div className="infoBlock" id="infoBlock">
          <div>
            <div className="infoBlockTitle">Информация о объекте</div>                
            <div className="nodeInfo">
              <div id="INFO1">IIN: <span id="nodeIin"></span></div>
              <div id="INFO2">NAME: <span id="nodeName"></span></div>
              <div id="INFO3">LABEL: <span id="nodeLabel"></span></div>
              {/* <div>RELATIONS: <span id="nodeRel">SCHOOL 4</span></div> */}
              <div id="INFO4">START DATE: <span id="nodeStart"></span></div>
              {/* <div>END DATE: <span id="nodeEnd">2017</span></div> */}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default RightBar;