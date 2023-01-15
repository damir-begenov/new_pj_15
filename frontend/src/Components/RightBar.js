import React, {Component} from "react";
import ReactDOM from "react-dom";

class RightBar extends Component{
  render() {
    return (
      <div className='rightBar'>
          <div className="nodeInfoTitle">Graph Info</div>
          <div className='nodeHints'>
            <div className='nodeHint nodeHint_green'>
              Person
            </div>
            <div className='nodeHint nodeHint_red'>
              School
            </div>
          </div>

          <div className='nodeInfoBlock'>
            <div>Объекты: <span>{this.props.objects}</span></div>
            <div>Связи: <span>{this.props.relations}</span></div>
          </div>

          <div className="infoBlock">
              <hr/>
              <div>
                  <div className="infoBlockTitle">Node Info</div>
                  
              </div>
          </div>
      </div>
  );
  }
}

export default RightBar;