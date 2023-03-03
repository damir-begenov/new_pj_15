import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
import './RightBar.css'

class RightBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNodeInfo: false,
      showNodeAddInfo: false
    }
  }

  render() {
    return (
      <div className='rightBar'>
        <div className="infoBlock" id="infoBlock">
          <div>
            <div className="infoBlockTitle">Информация {this.props.isOnSelectEdge || this.props.isOnSelectEdge ? "о объекте" : ""}</div>
              <div className="nodeInfo" id="nodeInfo" style={{display: this.props.isOnSelectNode || this.props.isOnSelectEdge ? "flex" : "none"}}>
                <div className="nodeInfoTitle" 
                    onClick={() => {
                      console.log(this.state.showNodeInfo)
                      this.state.showNodeInfo = !this.state.showNodeInfo
                      document.querySelector('#nodeInfoInner').style.display = this.state.showNodeInfo ? "flex" : "none"
                    }}>
                  <div>Общие сведения</div>
                  <i>+</i>
                </div>
                <div className="nodeInfoInner" id="nodeInfoInner">

                </div>
              </div> 

              <div className="nodeInfo" id="nodeAddInfo" style={{display: this.props.isOnSelectNode ? "flex" : "none"}}>
                <div className="nodeInfoTitle" 
                    onClick={() => {
                      this.state.showNodeAddInfo = !this.state.showNodeAddInfo
                      document.querySelector('#nodeAddInfoInner').style.display = this.state.showNodeAddInfo ? "flex" : "none"
                    }}>
                  <div>Дополнительные сведения</div>
                  <i>+</i>
                </div>
                <div className="nodeInfoInner nodeAddInfoInner" id="nodeAddInfoInner">

                </div>
              </div> 
          </div> 
        </div>
        <div className="actionBlock" style={{display: this.props.isOnSelectNode ? "flex" : "none"}}>
            <input type="button" visible="false" value="Show" onClick={ event => this.props.shortOpen().bind(this)}/>
            <input type="button" visible="false" value="Hide" onClick={ event => this.props.shortHide().bind(this)}/>
        </div>
      </div>
    );
  }
}

export default RightBar;