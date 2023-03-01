import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
import './RightBar.css'

class RightBar extends Component {
  constructor(props) {
    super(props)
    this.state = {showNodeInfo: false}
  }

  render() {
    return (
      <div className='rightBar'>
        <div className="infoBlock" id="infoBlock">
          <div>
            <div className="infoBlockTitle">Информация о объекте</div>
            <div className="nodeInfo" id="nodeInfo">
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    console.log(this.state.showNodeInfo)
                    this.state.showNodeInfo = !this.state.showNodeInfo
                    document.querySelector('.nodeInfoInner').style.display = this.state.showNodeInfo ? "flex" : "none"
                  }}>
                <div>Общие сведения</div>
                <i>{this.state.showNodeInfo ? "-" : "+"}</i>
              </div>
              <div className="nodeInfoInner" id="nodeInfoInner">

              </div>
            </div>
          </div>
        </div>
        <div className="actionBlock">
          {this.props.showAction ? 
            (<><input type="button" visible="false" value="Show" onClick={ event => this.props.shortOpen().bind(this)}/>
            <input type="button" visible="false" value="Hide" onClick={ event => this.props.shortHide().bind(this)}/></>)
            : ""}
        </div>
      </div>
    );
  }
}

export default RightBar;