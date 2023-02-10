import React, {Component} from "react";
import ReactDOM from "react-dom";
import './RightBar.css'

class RightBar extends Component {
  render() {
    return (
      <div className='rightBar'>
        <div className="infoBlock" id="infoBlock">
          <div>
            <div className="infoBlockTitle">Информация о объекте</div>                
            <div className="nodeInfo" id="nodeInfo"></div>
          </div>
        </div>
        <div className="actionBlock">
          {true ? 
            (<input type="button" visible="false" value="Show" onClick={ event => this.props.shortOpen().bind(this)}/>) 
            : ""}
            <input type="button" visible="false" value="Hide" onClick={ event => this.props.shortHide().bind(this)}/>
        </div>
      </div>
    );
  }
}

export default RightBar;