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
              <div>IIN: <span>ASDAASF</span></div>
              <div>NAME: <span>STEFAN SALVATORE</span></div>
              <div>RELATIONS: <span>SCHOOL 4</span></div>
              <div>START DATE: <span>2007</span></div>
              <div>END DATE: <span>2017</span></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default RightBar;