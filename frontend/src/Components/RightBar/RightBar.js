import React, {Component, useState} from "react";
import ReactDOM from "react-dom";

import RelationBlock from "../Relation/RelationBlock";
import './RightBar.css'

const RightBar = (props) => {
  const [showRels, setShowRelss] = useState("")
  const [openLimit, setOpenLimit] = useState(1)
  const [layout, setLayout] = useState("network")
  const [showNodeInfo, setShowNodeInfo] = useState(false)
  const [showNodeAddInfo, setShowNodeAddInfo] = useState(false)

  const setShowRels = (rels) => {
    setShowRelss(rels);
  }

  const shortOpen = () => {
    props.shortOpen(openLimit, showRels)
  }

  const shortHide = () => {
    props.shortHide()
  }

  const handleLayout = () => {
    props.layoutHandler()
  } 

  return (
    <div className='rightBar'>
      <div className="infoBlock" id="infoBlock">
        <div>

          <div className="graphLayoutHandler">
            <div className="glTitle">Вид графа</div>
            <div className="glType" onClick={handleLayout}>Иерархический</div>
          </div>
          
          <div className="infoBlockTitle">Информация {props.isOnSelectNode || props.isOnSelectEdge ? "о объекте" : ""}</div>
          <div className="nodeImg"
              style={{display: props.showImage 
              ? "flex" : "none"}}>
          </div>
            <div className="nodeInfo" id="nodeInfo" 
                style={{display: props.isOnSelectNode 
                  || props.isOnSelectEdge 
                ? "flex" : "none"}}>
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    setShowNodeInfo(!showNodeInfo)
                    document.querySelector('#nodeInfoInner').style.display = showNodeInfo ? "flex" : "none"
                  }}>
                <div>Общие сведения</div>
                <i>+</i>
              </div>
              <div className="nodeInfoInner" id="nodeInfoInner">

              </div>
            </div> 

            <div className="nodeInfo" id="nodeAddInfo" style={{display: props.isOnSelectNode ? "flex" : "none"}}>
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    setShowNodeAddInfo(!showNodeAddInfo)
                    document.querySelector('#nodeAddInfoInner').style.display = showNodeAddInfo ? "flex" : "none"
                  }}>
                <div>Дополнительные сведения</div>
                <i>+</i>
              </div>
              <div className="nodeInfoInner nodeAddInfoInner" id="nodeAddInfoInner">

              </div>
            </div> 

            <div className="nodeInfo" id="nodeAddInfo" style={{display: props.isOnSelectNode && props.showSudInfo ? "flex" : "none"}}>
              <div className="nodeInfoTitle" 
                  onClick={() => {
                    setShowNodeAddInfo(!showNodeAddInfo)
                    document.querySelector('#nodeSudInfoInner').style.display = showNodeAddInfo ? "flex" : "none"
                  }}>
                <div>Риски</div>
                <i>+</i>
              </div>
              <div className="nodeInfoInner nodeSudInfoInner" id="nodeSudInfoInner">

              </div>
            </div> 
        </div> 
      </div>

      <div className={"openHideBlock"} style={{display: props.isOnSelectNode ? "flex" : "none"}}>
        <div className="actionBlock" style={{display: props.isOnSelectNode ? "block" : "none"}}>
            <input type="button" visible="false" value="Show" onClick={shortOpen}/>
            <input type="button" visible="false" value="Hide" onClick={shortHide}/>
        </div>

        <div>
          <div className="limitInputBlock">
            <label>Лимит</label>
            <input name="openLimit" className={"openLimit"} value={openLimit} onChange={event => {
              setOpenLimit(event.target.value)
            }}/>
          </div>
        </div>

        <div className="showRelsBlockRight" >
          <div>            
            <RelationBlock setRels={setShowRels}></RelationBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;