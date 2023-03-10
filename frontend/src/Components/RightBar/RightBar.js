import React, {Component, useState} from "react";
import ReactDOM from "react-dom";

import RelationBlock from "../RelationRight/RelationRightBlock";
import './RightBar.css'

class RightBar extends Component {
  constructor(props) {
    super(props)
  }

  setShowRels = (rels) => {
    this.state.showRels = rels;
  }

  shortOpen = () => {
    let relations = ""
    Object.keys(this.state.categories).forEach(key => {
        if (this.state.categories[key].checked) {
            if (relations == "") relations = key
            else relations += "," + key
        }
    })
    this.props.shortOpen(relations)
  }

  shortHide = () => {
    this.props.shortHide()
  }

  render() {
    return (
      <div className='rightBar' style={{display: (this.props.isOnSelectNode || this.props.isOnSelectEdge ?"flex":"none")}}>
        <div className="infoBlock" id="infoBlock">
          <div>
            <div className="infoBlockTitle">Информация {this.props.isOnSelectNode || this.props.isOnSelectEdge ? "о объекте" : ""}</div>
            <div className="nodeImg"
                style={{display: this.props.showImage 
                ? "flex" : "none"}}>
            </div>
              <div className="nodeInfo" id="nodeInfo" 
                  style={{display: this.props.isOnSelectNode 
                    || this.props.isOnSelectEdge 
                  ? "flex" : "none"}}>
                <div className="nodeInfoTitle" 
                    onClick={() => {
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

              <div className="nodeInfo" id="nodeAddInfo" style={{display: this.props.isOnSelectNode && this.props.showSudInfo ? "flex" : "none"}}>
                <div className="nodeInfoTitle" 
                    onClick={() => {
                      this.state.showNodeAddInfo = !this.state.showNodeAddInfo
                      document.querySelector('#nodeSudInfoInner').style.display = this.state.showNodeAddInfo ? "flex" : "none"
                    }}>
                  <div>Риски</div>
                  <i>+</i>
                </div>
                <div className="nodeInfoInner nodeSudInfoInner" id="nodeSudInfoInner">

                </div>
              </div> 
          </div> 
        </div>
        <div className="actionBlock" style={{display: this.props.isOnSelectNode ? "block" : "none"}}>
            <input type="button" visible="false" value="Show" onClick={this.shortOpen}/>
            <input type="button" visible="false" value="Hide" onClick={this.shortHide}/>
        </div>

        <div className="showRelsBlock" style={{display: this.props.isOnSelectNode ? "flex" : "none"}}>
          <div>            
            <RelationBlock setRels={this.setShowRels}></RelationBlock>
          </div>
        </div>
      </div>
    );
  }
}

export default RightBar;