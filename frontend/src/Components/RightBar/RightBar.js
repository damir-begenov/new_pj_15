import React, {Component, useState} from "react";
import ReactDOM from "react-dom";

import RelationBlock from "../Relation/RelationBlock";
import './RightBar.css'

class RightBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNodeInfo: false,
      showNodeAddInfo: false,
      showRels: "",
      allRels: true,
      categories: {
        BUHGALTER: {
            value: "Бухгалтер",
            checked: true,
            level: 0
        },
        DETDOM_HIST: {
            value: "Детдом",
            checked: true,
            level: 0
        },
        DFO_AFF_FIZ: {
            value: "ДФО-Фл",
            checked: true,
            level: 0
        },
        DFO_AFF_UL: {
            value: "ДФО-Юл",
            checked: true,
            level: 0
        },
        DIRECTOR_CUR: {
            value: "Нынешний Директор",
            checked: true,
            level: 0
        },
        DIRECTOR_HIST: {
            value: "Бывший Директор",
            checked: true,
            level: 0
        },
        FOUNDER_CUR: {
            value: "Нынешний Учредитель",
            checked: true,
            level: 0
        },
        FOUNDER_HIST: {
            value: "Бывший Учредитель",
            checked: true,
            level: 0
        },
        ESF_100: {
            value: "ЭСФ100М+",
            checked: true,
            level: 0
        },
        ESF_10and100: {
            value: "ЭСФ1М-10М",
            checked: true,
            level: 0
        },
        ESF_10and50: {
            value: "ЭСФ10М-50М",
            checked: true,
            level: 0
        },
        ESF_50and100: {
            value: "ЭСФ50М-100М",
            checked: true,
            level: 0
        },
        ESF_5and10: {
            value: "ЭСФ500-1М",
            checked: true,
            level: 0
        },
        FPG: {
            value: "ФПГ",
            checked: true,
            level: 0
        },
        GOSZAKUP: {
            value: "ГОСЗАКУП",
            checked: true,
            level: 0
        },
        IP_KX: {
            value: "ИП-КХ",
            checked: true,
            level: 0
        },
        NTR_FL: {
            value: "Нотариус Фл",
            checked: true,
            level: 0
        },
        NTR_UL_FL: {
            value: "Нотариус Фл",
            checked: true,
            level: 0
        },
        OPG: {
            value: "ОПГ",
            checked: true,
            level: 0
        },
        PDL: {
            value: "ПДЛ",
            checked: true,
            level: 0
        },
        REG_ADDRESS: {
            value: "АДРЕС-РЕГИСТР",
            checked: true,
            level: 0
        },
        REG_ADDRESS_CUR: {
            value: "АДРЕС-НЫНЕШНИЙ",
            checked: true,
            level: 0
        },
        REG_ADDRESS_HIST: {
            value: "АДРЕС-СТАРЫЙ",
            checked: true,
            level: 0
        },
        REG_ADDRESS_UL: {
            value: "АДРЕС-ЮЛ",
            checked: true,
            level: 0
        },
        SLUZHIL: {
            value: "Служил",
            checked: true,
            level: 0
        },
        SUDIM: {
            value: "Судим",
            checked: true,
            level: 0
        },
        UCHILSYA: {
            value: "Образование",
            checked: true,
            level: 0
        },
        WORKER_CUR: {
            value: "НЫНЕШНИЙ РАБОТНИК",
            checked: true,
            level: 0
        },
        WORKER_HIST: {
            value: "БЫВШИЙ РАБОТНИК",
            checked: true,
            level: 0
        },
        ZAGS: {
            value: "ЗАГС",
            checked: true,
            level: 0
        },
        ZAGS_FIO: {
            value: "ЗАГС-ФИО",
            checked: true,
            level: 0
        },
        ZAGS_IIN: {
            value: "ЗАГС-ИИН",
            checked: true,
            level: 0
        },
      }
    }
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
      <div className='rightBar'>
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
            <input type={"button"} value="Все связи"
              onClick={() => {
                this.setState({allRels: !this.state.allRels});
                let relsTemp = this.state.categories;
                Object.keys(this.state.categories).filter((key) => this.state.categories[key].level == 0).map((key, index) => {
                  relsTemp[key].checked = this.state.allRels
                })
                this.setState({categories: relsTemp})

                console.log(this.state.categories)
              }}/>
          </div>
          {Object.keys(this.state.categories).filter((key) => this.state.categories[key].checked && this.state.categories[key].level == 0).map((key, index) => {
            return (
              <div className="checkboxes">
                <label>{this.state.categories[key].value}</label>
                <input type={"checkbox"} checked={this.state.categories[key].checked} 
                  onChange={() => {
                    let relsTemp = this.state.categories;
                    relsTemp[key].checked = !relsTemp[key].checked
                    this.setState({categories: relsTemp})
                    console.log(this.state.categories[key].checked)
                  }
                } />
              </div>
            )
          })}
          <hr width="100%"></hr>
          {Object.keys(this.state.categories).filter((key) => !this.state.categories[key].checked && this.state.categories[key].level == 0).map((key, index) => {
            return (
              <div className="checkboxes">
                <label>{this.state.categories[key].value}</label>
                <input type={"checkbox"} 
                  onChange={(event) => {
                    let relsTemp = this.state.categories;
                    relsTemp[key].checked = event.target.checked
                    this.setState({categories: relsTemp})
                    console.log(this.state.categories[key].checked)
                  }
                } />
              </div>
            )
          })}
          {/* <RelationBlock setRels={this.setShowRels}></RelationBlock> */}
        </div>
      </div>
    );
  }
}

export default RightBar;