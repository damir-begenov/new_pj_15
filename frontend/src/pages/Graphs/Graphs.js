import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import axios from 'axios';
import { Component } from "react";
import LeftBar from "../../Components/LeftBar/LeftBar";
import RightBar from "../../Components/RightBar/RightBar";
import html2canvas from 'html2canvas';

import './../../Loader.css'
import './Graphs.css'

import userIconWhite from "./../../user-icon-white.png";
import userIconBlack from "./../../user-icon-black.png";
import buildingIcon from "./../../eclipse-1.png";
import userIconRed from "./../../user-icon-red.png";

import useFetch from "../../hooks/useFetch.js";

// icons
import addressIcon from '../../icons/address.png'
import companyIcon from '../../icons/company.png'
import judgeCompanyIcon from '../../icons/judge_company.png'
import judgePersonIcon from '../../icons/judge_person.jpg'
import keyCompanyIcon from '../../icons/key_company.png'
import keyJudgePersonIcon from '../../icons/key_judge_person.jpg'
import keyPersonIcon from '../../icons/key_person.png'
import personIcon from '../../icons/person.png'
import personjaiIcon from '../../icons/personjai.png'
import ripPersonIcon from '../../icons/rip_person.png'

var graJSON = {nodes: [], edges: [], typeOfSearch: "", params: {}}
var Network;
var SelectedNode = {}
var SelectedEdge = {}

var onSelectNode = false;

export default class GraphNet extends Component {
    state = {
      ids: [],
      nodes: [],
      edges: [],
      temp: '',
      counter: 0,
      showActionBtn: false,
      sliderPage: 0,
      searchedNodes: [],
      showNodeInfo: false,
      showEdgeInfo: false,
      showNodeImage: false,
      showSudInfo: false,
      keyNodeId: 0
    }

    assignInfoBlock = (options, elemId) => {
      const infoBlock = document.querySelector(elemId)
      Object.entries(options).forEach(entry => {
        const [key, value] = entry;

        if (value == null) return

        const info = document.createElement("div")
        info.innerHTML = `${key.toUpperCase()}: <span>${value}</span>`

        infoBlock.appendChild(info)
      });
    }

    createContextMenu = (params) => {
      var canvas = Network.body.container.firstChild;

      if (canvas.getContext) {
        var ctx = canvas.getContext("webgl");

        ctx.fillStyle = "red";


        ctx.beginPath();
        ctx.arc(params.pointer.DOM.x, params.pointer.DOM.y, 50, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    numbers = {
      objects: 0,
      relations: 0
    }
    current = {
      iin: '',
      name: '',
      relations: [],
      label: ''
    }

    Submit = async (options) => {
      this.state.isLoading = true
      this.setState({nodes: [], edges: [], ids: []})
      this.state.counter = this.state.counter+1

      
      const userSession = JSON.parse(localStorage.getItem("user"))

      let url = "";
      let params ={};
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
      switch(options.mode) {
        case "con1":
          graJSON.typeOfSearch = "con1"
          if (options.searchOption == "iinOption") {
            url = "http://localhost:9091/api/finpol/main/fltree"
            params = {person: options.iin1, relations: options.relString, depth: options.depth, limit: options.limit}
            graJSON.params = params
          } else {
            url = "http://localhost:9091/api/finpol/main/flFIOtree"
            params = {
              firstName1: options.name1, 
              lastName1: options.lname1, 
              fatherName1: options.fname1, 
              relations: options.relString, depth: options.depth, limit: options.limit
              
            }
            graJSON.params = params
          }
          break;
        case "con2":
          graJSON.typeOfSearch = "con2"
          if (options.searchOption == "iinOption") {
            url = "http://localhost:9091/api/finpol/main/shortestpaths";
            params = {person: options.iin1, person2: options.iin2, relations: options.relString}
            graJSON.params = params
          } else {
            url = "http://localhost:9091/api/finpol/main/shortestpathsByFIO";
            params = {
              firstName1: options.name1, 
              lastName1: options.lname1, 
              fatherName1: options.fname1,
              firstName2: options.name2, 
              lastName2: options.lname2, 
              fatherName2: options.fname2, 
              relations: options.relString
            }
            graJSON.params = params
          }
          break;
        case "con3":
          graJSON.typeOfSearch = "con3"
          if (options.searchOption == "iinOption") {
            url = "http://localhost:9091/api/finpol/main/flulpath";
            params = {person: options.iin1, ul: options.iin2, relations: options.relString}
            graJSON.params = params
          } else {
            url = "http://localhost:9091/api/finpol/main/flulpathByFIO";
            params = {
              firstName1: options.name1, 
              lastName1: options.lname1, 
              fatherName1: options.fname1, 
              ul: options.iin2, 
              relations: options.relString}
              graJSON.params = params
          }
          break;
        case "con4":
          graJSON.typeOfSearch = "con4"
          url = "http://localhost:9091/api/finpol/main/ultree";
          params = {ul: options.iin1, relations: options.relString, depth: options.depth, limit: options.limit }
          graJSON.params = params
          break;
        case "con5":
          graJSON.typeOfSearch = "con5"
          url = "http://localhost:9091/api/finpol/main/ululpath";
          params = {ul1: options.iin1, ul2: options.iin2, relations: options.relString}
          graJSON.params = params
          break;
      }

      params["approvement_type"] = options.approvementObj.approvement_type
      params["orderNum"] = options.approvementObj.orderNum
      params["orderDate"] = options.approvementObj.orderDate
      params["articleName"] = options.approvementObj.articleName
      params["caseNum"] = options.approvementObj.caseNum
      params["checkingName"] = options.approvementObj.checkingName
      params["otherReasons"] = options.approvementObj.other
      params["organName"] = options.approvementObj.organName
      params["rukName"] = options.approvementObj.rukName
      params["sphereName"] = options.approvementObj.sphereName
      params["tematikName"] = options.approvementObj.tematikName

      // if (options.name1 != "") params["firstName1"] = options.name1 
      // if (options.name2 != "") params["firstName2"] = options.name2 
      // if (options.lname1 != "") params["lastName1"] = options.lname1 
      // if (options.lname2 != "") params["lastName2"] = options.lname2 
      // if (options.fname1 != "") params["fatherName1"] = options.fname1 
      // if (options.fname2 != "") params["fatherName2"] = options.fname2 

      console.log(params)

      axios.get(url, {params: params}).then(res => {
        let nodes = []
        const edges = res.data.edges;
        console.log(res.data)
        
        edges.map(item => {
          this.setEdgeSettings(item);
        })
      
        res.data.nodes.map(item => {
          this.setNodeSettings(item, options.iin1, options.iin2)
          nodes.push(item);
        })
        
        this.setState({nodes, edges})

        console.log("first")

        graJSON.nodes = nodes
        graJSON.edges = edges
        
        this.state.isLoading = false

        const fileInput = document.getElementById('file-upload')
        fileInput.value = ""
        this.setState({showActionBtn: true})
        // Network.fit({});
      })
    };

    shortOpen = (showRels) => {
      console.log(showRels)
      axios.get("http://localhost:9091/api/finpol/main/shortopen", {params: {id: SelectedNode.options.id, relations: showRels }}).then(res => {
        let nodes = []
        const edgesFinal = res.data.edges;
        let edges = []
        edgesFinal.filter(item => 
          (!this.state.ids.includes(item.to) || !this.state.ids.includes(item.from))).
          map(item => {
            edges.push(item)
             // Потом с направлениями связей омогут возникнуть проблемы
        })

        edges.map(item => {
          this.setEdgeSettings(item);
          this.state.edges.push(item)
        })
        res.data.nodes.map(item => {
          this.setNodeSettings(item)
          nodes.push(item);
          this.state.ids.push(item.id)
          this.state.nodes.push(item)
        })
        console.log(res.data)
        this.state.edges = [...edges, ...this.state.edges]
        console.log(this.state.edges)
        Network.body.data.nodes.update(nodes)
        Network.body.data.edges.update(edges)
        // this.state.edges = Network.body.data.edges
        graJSON.nodes = this.state.nodes
        graJSON.edges = this.state.edges

        Network.fit({});
      })
    }
    shortHide = () => {
      console.log(Network)
      this.state.edges.map(item => {
        // console.log("EDGES STATE", item)
        if (item.to === SelectedNode.options.id) { 
          this.removeNode(item.from)
        }

        if (item.from === SelectedNode.options.id) {
          this.removeNode(item.to)
        }

      })
      this.removeNode(SelectedNode.options.id)
    }

    removeNode = (id) => {
      if (id != this.state.keyNodeId)
        Network.body.data.nodes.remove([{id: id}]);
    }

    setEdgeSettings = (edge) => {
      edge.label = edge.properties.Vid_svyaziey
      Object.assign(edge, {"properties": edge.properties})
      Object.assign(edge, {"color": "white"})
      Object.assign(edge, {font: {color: "white"}})
      Object.assign(edge, {id: edge.properties.id})

      if (edge.type === 'UCHILSYA' || edge.type === 'SLUZHIL') {
        edge.color = "lime"
      
      } else if (edge.type == 'REG_ADDRESS_CUR' || edge.type == 'REG_ADDRESS_HIST' || edge.type == 'REG_ADDRESS') {
        edge.color = "aqua"
      
      } else if (edge.type == 'ZAGS' || edge.type == 'ZAGS_FIO' || edge.type == 'ZAGS_IIN') {
        edge.color = "pink"

      } else if (edge.type == 'WORKER_CUR' || edge.type == 'WORKER_HIST') {
        edge.color = "blue"

      } else if (edge.type == 'SUDIM') {
        edge.color = "red"

      }
    }

    setNodeSettings = (node, iin1, iin2) => {
      this.state.ids.push(node.id)

      if (node.properties.Type == "ЮЛ" || node.properties.Type == "ИП") {
        // settings for ul
        node.label = node.properties.Name;
        
        const p = node.properties;
        if (p.STATUS_OPG != null || p.STATYA_ERDR != null || p.ORGAN_REGISTER != null) {
          node.group = "judgeCompany"

        } else if (p.IINBIN == iin1 || p.IINBIN == iin2) {
          this.state.keyNodeId = node.id;
          node.group = "keyCompany"

        } else {
          node.group = "company"
        }

      } else if (node.properties.Ulica != null) {
        // settings for propiska
        node.group = "PROPISKA"

        node.label = node.properties.Adress_propiski;

      } else {
        // settings for fl
        const p = node.properties;

        node.label = p.FIO

        let key = false;
        if (p.IIN != null && (p.IIN == iin1 || p.IIN == iin2)) key = true; 

        if (p.Death_Status != null) {
          node.group = "ripPerson"

        } else if (p.Organ_pravanarushenya != null || p.Pristavanie != null || p.Razmer_Shtrafa != null 
          || p.Status_KUIS != null || p.Status_Minzdrav != null || p.Statya != null 
          || p.Sud_ispolnitel != null || p.Med_org != null) {

            if (key) node.group = "keyJudgePerson"
            else node.group = "judgePerson"

        } else {

          if (node.properties.IIN == null) node.group = "personJai"
          else if (key) node.group = "keyPerson"
          else node.group = "person"

        }

        if (key) this.state.keyNodeId = node.id; 
      }

    }

    colors = {
      
    }

    options = {
      autoResize: true,
      edges: {
        // color: 'white',
        length: 200,
        width: 1,
        selectionWidth: 5,
        arrows: {
          to: true,
        },
        smooth: {
          "type": "dynamic",
          "forceDirection": "none",
          roundness: 0.5
        }, 
        font: {
          strokeWidth: 0,
          size: 10,
          align: "top"
        },
      },
      physics:
      {
        enabled: true,
        barnesHut: {
          springConstant: 0,
          theta: 0.5,
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        maxVelocity: 25,
        minVelocity: 0,
        solver: "barnesHut",
        timestep: 0.5,
        wind: { x: 0, y: 0 }

      },
      groups: {
        keyPerson: {
          shape: "circularImage",
          image: keyPersonIcon,
        },
        person: {
          shape: "circularImage",
          image: personIcon,
        },
        personJai: {
          shape: "circularImage",
          image: personjaiIcon,
        },
        keyJudgePerson: {
          shape: "circularImage",
          image: keyJudgePersonIcon,
        },
        ripPerson: {
          shape: "circularImage",
          image: ripPersonIcon,
        },
        judgePerson: {
          shape: "circularImage",
          image: judgePersonIcon,
        },
        keyCompany: {
          shape: "circularImage",
          image: keyCompanyIcon,
        },
        company: {
          shape: "circularImage",
          image: companyIcon,
        },
        judgeCompany: {
          shape: "circularImage",
          image: judgeCompanyIcon,
        },
        PROPISKA: {
          shape: "circularImage",
          image: addressIcon,
        },
      },
      nodes: {
        font: {
          size: 14,
          color: "white"
        },
        size: 20
      },

      height: "100%",

      layout: {
        randomSeed: 1,
        improvedLayout: true,
      }
    };

    manipulation = {
      deleteNode: true,
    }

    events = {
      selectNode: (event) => {
        this.setState({showNodeInfo: true})
        this.setState({showEdgeInfo: false})
        this.setState({showNodeImage: false})
        this.setState({showSudInfo: false})

        SelectedNode = Network.selectionHandler.selectionObj.nodes[Object.keys(Network.selectionHandler.selectionObj.nodes)[0]]

        onSelectNode = true

        const infoBlock = document.querySelector("#nodeInfoInner")
        const addInfoBlock = document.querySelector("#nodeAddInfoInner")
        const sudInfoBlock = document.querySelector("#nodeSudInfoInner")
        const nodeImage = document.querySelector('.nodeImg');

        addInfoBlock.innerHTML = ""
        infoBlock.innerHTML = ""
        sudInfoBlock.innerHTML = ""

        console.log(SelectedNode)

        const sp = SelectedNode.options.properties;
        const sg = SelectedNode.options.group;
        if (sg == "person" || sg == "judgePerson" || sg == "ripPerson"
            || sg == "keyJudgePerson" || sg == "personJai" || sg == "keyPerson") {

          this.setState({showNodeImage: true})

          if (!SelectedNode.options.photoDbf) {
            nodeImage.innerHTML = `<h3>Нет фото</h3>`
          } else {
            nodeImage.innerHTML = `<img src="data:image/png;base64, ${SelectedNode.options.photoDbf.photo}"/>`
          }
              
          this.assignInfoBlock({
            "ИИН": sp.IIN || "Нет ИИН-а",
            "Имя": sp.FIO.split(" ")[1] || "Нет имя", 
            "Фамилия": sp.Familia || "Нет фамилии",
            "ФИО": sp.FIO || "Нет ФИО",
            "Отчество": sp.Otchestvo || "Нет отчества",
            "Дата рождения": sp.Data_Rozhdenya || "Нет даты рождения"
          }, '#nodeInfoInner')

          this.assignInfoBlock({
            "class": "Person",
            "PersonID": sp.PersonID,
            "Label": sp.Label,
            "Source": sp.Source,
          }, '#nodeAddInfoInner')

          this.assignInfoBlock({"Аудитор": sp.Autditor}, '#nodeAddInfoInner')
          this.assignInfoBlock({"Нотариус": sp.Notarius}, '#nodeAddInfoInner')
          this.assignInfoBlock({"Адвокат": sp.Advocat}, '#nodeAddInfoInner')
          this.assignInfoBlock({"Аудитор": sp.Autditor}, '#nodeAddInfoInner')
          this.assignInfoBlock({"Частный судебный исполнитель": sp.Sud_ispolnitel}, '#nodeAddInfoInner')
        
        } else if (sg == "judgeCompany" || sg == "company" || sg == "keyCompany") {
           
          this.assignInfoBlock({
            "Наименование": sp.Name,
            "ИИН/БИН": sp.IINBIN, 
            "Тип": sp.Type,
          }, '#nodeInfoInner')

          this.assignInfoBlock({
            "class": sp.Name,
            "PersonID": sp.PersonID, 
            "Label": sp.Label,
            "Source": sp.Source,
          }, '#nodeAddInfoInner')

          this.assignInfoBlock({"Бухгалтер": sp.Buhgalter}, '#nodeAddInfoInner') 
          this.assignInfoBlock({"НДС": sp.NDS}, '#nodeAddInfoInner') 

        } else if (sg == 'PROPISKA') {

          this.assignInfoBlock({
            "Строение": sp.Stroenie,
            "РКА": sp.PKA, 
            "Область": sp.Oblast,
            "Район": sp.Rayon,
            "Город": sp.Gorod,
            "Квартира": sp.Kvartira,
            "Улица": sp.Ulica,
            "Корпус": sp.Korpus,
            "Адрес прописки": sp.Adress_propiski,
          }, '#nodeInfoInner')

          this.assignInfoBlock({
            "class": sp.Name,
            "Код области": sp.Kod_oblasti, 
            "Код страны": sp.Kod_Strani, 
            "Код района": sp.Kod_rayona, 
            "PersonID": sp.PersonID, 
            "Label": sp.Label,
            "Source": sp.Source,
          }, '#nodeAddInfoInner')

          this.assignInfoBlock({"Мед. Орг.": sp.Med_org,}, '#nodeSudInfoInner')
        }

        if (sg == 'judgePerson' || sg == 'keyJudgePerson' || sg == 'judgeCompany') {
          this.setState({showSudInfo: true})

          this.assignInfoBlock({"Мед. Орг.": sp.Med_org,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Приставание в общественных местах": sp.Pristavanie,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Орган, выявивший правонарушение": sp.Organ_pravanarushenya,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Дата решения": sp.Data_reshenya,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Статус КУИС": sp.Status_KUIS,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Размер наложенного штрафа": sp.Razmer_Shtrafa,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Статус Минздрав": sp.Status_Minzdrav,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Приказ о снятии с регистрационного учета": sp.PRIKAZ_O_SNYATYA,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Бездействующие ЮЛ": sp.BEZDEYSTVIA_UL,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Статус ОПГ": sp.STATUS_OPG,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Статья ЕРДР": sp.STATYA_ERDR,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Статус ЕРДР": sp.STATUS_ERDR,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Орган регистрации": sp.ORGAN_REGISTER,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"ФПГ": sp.FPG,}, '#nodeSudInfoInner')
          this.assignInfoBlock({"Направлено в": sp.Napravlenio_V,}, '#nodeSudInfoInner')

        }

      }, 

      deselectNode: (event) => {
        const infoBlock = document.querySelector("#nodeInfoInner")
        const addInfoBlock = document.querySelector("#nodeAddInfoInner")
        const sudInfoBlock = document.querySelector("#nodeSudInfoInner")

        infoBlock.innerHTML = ""
        addInfoBlock.innerHTML = ""
        sudInfoBlock.innerHTML = ""

        onSelectNode = false
        this.setState({showNodeInfo: false})
        this.setState({showEdgeInfo: false})
        this.setState({showNodeImage: false})
        this.setState({showSudInfo: false})

      },

      selectEdge: (event) => {
        if (onSelectNode == true) return

        this.setState({showNodeInfo: false})
        this.setState({showEdgeInfo: true})
        this.setState({showNodeImage: false})
        this.setState({showSudInfo: false})

        SelectedEdge = this.state.edges.filter(elem => elem.properties.id == Object.keys(Network.selectionHandler.selectionObj.edges)[0])[0]

        console.log(SelectedEdge)

        const infoBlock = document.querySelector("#nodeInfoInner")
        const addInfoBlock = document.querySelector("#nodeAddInfoInner")
        const sudInfoBlock = document.querySelector("#nodeSudInfoInner")
        addInfoBlock.innerHTML = ""
        infoBlock.innerHTML = ""

        const sp = SelectedEdge.properties
        this.assignInfoBlock({
          "id": sp.id,
          "Вид связи": sp.Vid_svyaziey,
          "Label": sp.Label,
          "Source": sp.Source
        }, '#nodeInfoInner')

        if (SelectedEdge.type == "REG_ADDRESS_HIST" || SelectedEdge.type == "REG_ADDRESS_CUR" || SelectedEdge.type == "REG_ADDRESS") {
          this.assignInfoBlock({
            "Дата начала прописки": sp.Data_nachali_propiski || sp.data_nachalo,
            "Дата окончания прописки": sp.data_oconchanya,
            "Дата регистрационного действия": sp.data_reg,
            "Адрес": sp.address_of_reg,
            "РКА": sp.rka,
          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == "WORKER_CUR" || SelectedEdge.type == "WORKER_HIST") {
          this.assignInfoBlock({
            "БИН/ИИН работадателя": sp.IINBIN_rabotadatelya,
            "ИИН": sp.IIN,
            "Дата начала отчисления ОПВ/СО": sp.data_nachalo,
            "Дата окончания отчисления ОПВ/СО": sp.data_oconchanya,
            "Средняя заработная плата": sp.average_zp,
            "Количество месяцев пенсионных отчислений": sp.mesyac_pensionnih,
            "Пенсионные отчисления": sp.pensionnoe_otchislenie,
            "Социальные отчисления": sp.soc_ochislenya,
            "Средняя заработная плата": sp.average_zp,

          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == 'SUDIM') {
          this.assignInfoBlock({
            "Дата начала заключения": sp.Data_nachala,
            "Дата конца заключения": sp.Data_konca,
            "Статья": sp.Statya,

          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == 'UCHILSYA') {
          this.assignInfoBlock({
            "Дата начала обучения": sp.data_nachalo, 
            "Дата конца обучения": sp.data_konca
          }, '#nodeInfoInner')

        } else {
          this.assignInfoBlock({
            "Название": sp.company,
            "Дата начала аффилированности": sp.Data_nachalo_affilirovannosti,
            "Тип аффилированности": sp.Type_affilirovannosti,
            "БИН/ИИН работадателя": sp.IINBIN_rabotadatelya,
            "Наименование типа должности на русском": sp.naimenovanie_tipa_dolzhnosty,
            "Наименование типа должности на русском": sp.NAME_tipa_dolzhnosty,
            "Дата начала": sp.data_nachalo,
            "Дата окончания": sp.data_oconchanya,
            "ИИН": sp.IIN,
            "Общая сумма ЭСФ": sp.obshaya_summa,
            "ЭСФ за 2019 год": sp.esf_2019,
            "ЭСФ за 2020 год": sp.esf_2020,
            "ЭСФ за 2021 год": sp.esf_2021,
            "ЭСФ за 2022 год": sp.esf_2022,
            "ИИН-БИН поставщика": sp.IINBIN_postavshika,
            "БИН заказчика": sp.BIN_zakazchika,
            "Итоговая сумма, без НДС": sp.itog_summa,
            "Дата": sp.data,
            "Номер сделки": sp.nomer_sdelki,
            "Тип сделки": sp.type_sdelki,
            "Представитель": sp.predstavitel,
            "ПДЛ": sp.pdl,
            "РКА": sp.rka,
            "Год службы": sp.god_sluzhbi,
          }, '#nodeInfoInner')

        }
      },

      deselectEdge: (event) => {
        this.setState({showNodeInfo: false})
        this.setState({showEdgeInfo: false})
        this.setState({showNodeImage: false})
        this.setState({showSudInfo: false})

      }

    }
    search() {
      this.updateSearched()
      this.showSearched()
    }

    update = () => {
      this.setState({nodes:[], edges: []}) 
      this.setState({counter: 0})
    }

    searchNext() {
      this.state.sliderPage = this.state.sliderPage + 1;
      if (this.state.sliderPage >= this.state.searchedNodes.length) {
        this.state.sliderPage = 0;
      }
      this.showSearched();
    }

    searchPrev() {
      this.state.sliderPage = this.state.sliderPage - 1;
      if (this.state.sliderPage < 0) {
        this.state.sliderPage = this.state.searchedNodes.length - 1;
      }
      this.showSearched();
    }

    updateSearched() {
      const value = document.getElementById("nodeSearchInput").value;
      const searchNodes = Object.values(Network.body.nodes).filter(elem => {
        for ( var key in elem.options.properties) {
          // console.log(elem.options.properties[key])
          if (elem.options.properties.hasOwnProperty(key) && elem.options.properties[key] != null) {
            let result = elem.options.properties[key].toString().replace(/[a-zA-Z]/g, function(char) {
              return char.toLowerCase()
            })
            if (result.includes(value.toLowerCase())) {
              return true;
            }
          }
        }
        if (elem.options.label != undefined && elem.options.label.toLowerCase().includes(value.toLowerCase())) {
          return true;
        }
      });

      this.state.sliderPage = 0;
      this.state.searchedNodes = searchNodes;
    }

    showSearched() {
      const item = this.state.searchedNodes[this.state.sliderPage];

      Network.focus(item.id, {
        scale: 1.5,
        offset: {
          x: 0,
          y: 0
        },
      })
    }

    download() {
      const target = Network.body.container
      html2canvas(target).then((canvas)=> {
        const base64image = canvas.toDataURL("image/png")
        var anchor = document.createElement('a')
        anchor.setAttribute("href", base64image)
        anchor.setAttribute("download", "graph-result.png")
        anchor.click()
        anchor.remove()
      })
    }        
    
    exportBt() {
      const fileName = "graph.txt"
      const fileContent = JSON.stringify(graJSON, null, 2)
      const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"})
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = fileName;
      link.href = url;
      link.click();
    }

    importBt = (file) =>  {
      this.setState({isLoading: true})
      this.setState({ids: []})
      const res = JSON.parse(file)
      // this.setState({nodes: result.nodes, edges: result.edges})
      let nodes = []
      const edges = res.edges;
      graJSON.typeOfSearch = res.typeOfSearch

      edges.map(item => {
        this.setEdgeSettings(item);
      })
    
      res.nodes.map(item => {
        this.setNodeSettings(item)
        if (this.state.ids(item.id)) {
        } else {
          this.state.ids.push(item.id)
          nodes.push(item);
        }
      })

      
      this.setState({nodes, edges})

      graJSON.nodes = nodes
      graJSON.edges = edges
      graJSON.paramsOfSearch = res.paramsOfSearch
      graJSON.typeOfSearch = res.typeOfSearch
      
      this.state.isLoading = false

      this.setState({showActionBtn: true})
      return graJSON
    }

    render() {
      if (this.state.counter===0 && !this.state.isLoading) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar update={this.update} importBt={this.importBt} exportBt = {this.exportBt}  name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
            <div className='centralBar'>
              <div className="waiterBox">
                {/* <a>Make a search</a> */}
                <i id="waiter" className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <RightBar showAction={this.state.showActionBtn} isOnSelectNode={this.state.showNodeInfo} isOnSelectEdge={this.state.showEdgeInfo} showImage={this.state.showNodeImage}  showSudInfo={this.state.showSudInfo}></RightBar>
          </>
          </div>
        )
      } else if (this.state.counter!==0 && this.state.nodes.length===0 && !this.state.isLoading) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar update={this.update} importBt={this.importBt} exportBt = {this.exportBt}  name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
              <div className='centralBar'>
              <div className="waiterBox">
                  <a>No objects found</a>
                </div>
              </div>
            <RightBar showAction={this.state.showActionBtn} isOnSelectEdge={this.state.showEdgeInfo}  showImage={this.state.showNodeImage}></RightBar>
          </>
          </div>
        )
      } else if (this.state.isLoading && this.state.nodes.length===0) {
        return (
          <div className='mainSection'>
          <>
            <LeftBar update={this.update} importBt={this.importBt} exportBt = {this.exportBt}   name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
              <div className='centralBar'>
                <div className="loader">
                  <div className="inner one"></div>
                  <div className="inner two"></div>
                  <div className="inner three"></div>
                </div>
              </div>
            <RightBar showAction={this.state.showActionBtn} isOnSelectNode={this.state.showNodeInfo} isOnSelectEdge={this.state.showEdgeInfo}  showImage={this.state.showNodeImage}  showSudInfo={this.state.showSudInfo}></RightBar>
          </>
          </div>
        )
      } else { 
      return (
        <div className='mainSection'>
        <>
        <LeftBar params={graJSON} update={this.update} downloadScheme={this.download} exportBt={this.exportBt} name={this.state.name} name2={this.state.name2} handleSubmit={this.Submit} setname={this.setChange}></LeftBar>
        <div className='centralBar' id="centralBar">
            <div className="nodeSearch">
              <div>
                <input type="text" id="nodeSearchInput" placeholder="Еще один поиск.." 
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      if(event.target.value != "") {
                        this.search(event.target.value)
                      } else {
                        Network.fit({});
                      }
                    }
                  }}
                  onChange={event => {
                    if (event.target.value == "") {
                      Network.fit({});
                    }
                  }}/>
                <i className="fa-solid fa-magnifying-glass"
                  onClick={() => this.search()}></i>
              </div>
              <div>
                <i className="fa-solid fa-caret-left"
                  onClick={() => this.searchPrev()}></i>
                <i className="fa-solid fa-caret-right"
                  onClick={() => this.searchNext()}></i>
              </div>
            </div>

            <Graph
              graph={this.state}
              options={this.options}
              events={this.events}
              getNetwork={network => {
                Network = network;
                network.once("afterDrawing", function () {
                  Network.on('doubleClick', (event) => {
                    // this.createContextMenu(event)
                  })
                });
              }}
              manipulation={this.manipulation}
              className={"graph"}
              />
        </div>          
        <RightBar showAction={this.state.showActionBtn} shortOpen={this.shortOpen} shortHide={this.shortHide} isOnSelectNode={this.state.showNodeInfo} isOnSelectEdge={this.state.showEdgeInfo} showImage={this.state.showNodeImage} showSudInfo={this.state.showSudInfo}></RightBar>
        </>
        </div>
      )
    }
  }

}

