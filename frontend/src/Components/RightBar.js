import React from "react";
import ReactDOM from "react-dom";

function RightBar() {
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
              <div>Объекты: <span>11</span></div>
              <div>Связи: <span>10</span></div>
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

export default RightBar;