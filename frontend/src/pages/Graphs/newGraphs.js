import React, { useEffect, useState } from "react";
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
import ntrIcon from '../../icons/ntrIcon.jpg'

var graJSON = {nodes: [], edges: [], typeOfSearch: "", params: {}, iin: false}
var Network;
var SelectedNode = {}
var SelectedEdge = {}

var onSelectNode = false;

const GraphNetnew = (props) => {
    const [updateGraph, setUpdateGraph] = useState(true)

    const [ids, setIds] = useState([])
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [searchedNodes, setSearchedNodes] = useState([])

    const [counter, setCounter] = useState(0)
    const [sliderPage, setSliderPage] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [showActionBtn, setShowActionBtn] = useState(false)
    const [showNodeInfo, setShowNodeInfo] = useState(false)
    const [showEdgeInfo, setShowEdgeInfo] = useState(false)
    const [showSudInfo, setShowSudInfo] = useState(false)
    const [showNodeImage, setShowImage] = useState(false)

    const [keyNodeId, setKeyNodeId] = useState(0)
    const [nodeStack, setNodeStack] = useState([])

    const [physicsEnable, setPhysicsEnable] = useState(true)
    const [layoutOptions, setLayoutOptions] = useState({
        hierarchical: {
            enabled: false,
            levelSeparation: 150,
            nodeSpacing: 200,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed
            shakeTowards: 'leaves'  // roots, leaves
        },
        randomSeed: 1,
        improvedLayout: true,
    })

    const edgesOptions = {
        length: 400,
        width: 0.3,
        selectionWidth: 2,
        arrows: {
            to: true,
        },
        smooth: {
            "type": "dynamic",
            "forceDirection": "vertical",
            "roundness": 0
        }, 
        font: {
            strokeWidth: 0,
            size: 10,
            align: "top"
        },
    }

    const physicsOptions = {
        enabled: physicsEnable,
        "physics": {
            "repulsion": {
                "centralGravity": 0,
                "springLength": 335,
                "springConstant": 0.205,
                "nodeDistance": 150,
                "damping": 0.21
            },
            "maxVelocity": 55,
            "minVelocity": 0.75,
            "solver": "repulsion",
            "timestep": 0.81,
            "wind": {
                "x": 0.1
            }
        }
    }

    const groupsOptions = {
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
        notarius: {
            shape: "circularImage",
            image: ntrIcon,  
        }
    }

    const nodesOptions = {
        font: {
            size: 14,
            color: "white"
        },
        size: 20
    }

    const graphOptions = {
        autoResize: true,
        edges: edgesOptions,
        physics: physicsOptions,
        groups: groupsOptions,
        nodes: nodesOptions,
        height: "100%",
        layout: layoutOptions
    }

    const assignInfoBlock = (options, elemId) => {
        const infoBlock = document.querySelector(elemId)
        Object.entries(options).forEach(entry => {
            const [key, value] = entry;

            if (value == null) return

            const info = document.createElement("div")
            info.innerHTML = `${key.toUpperCase()}: <span>${value}</span>`

            infoBlock.appendChild(info)
        });
    }

    const Submit = async (options) => {
        setIsLoading(true)
        setNodes([])
        setEdges([])
        setIds([])
        setCounter(currCounter => currCounter + 1)
        console.log(options)

        const userSession = JSON.parse(localStorage.getItem("user"))

        let url = "";
        let params = {};

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
                    graJSON.iin = false
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
                    graJSON.iin = false
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
                    relations: options.relString
                    }
                    graJSON.params = params
                    graJSON.iin = false
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

        params["approvement_type"] = options.approvementObject ? options.approvementObject.approvement_type : ""
        params["orderNum"] = options.approvementObject ? options.approvementObject.orderNum : ""
        params["orderDate"] = options.approvementObject ? options.approvementObject.orderDate : ""
        params["articleName"] = options.approvementObject ? options.approvementObject.articleName : ""
        params["caseNum"] = options.approvementObject ?options.approvementObject.caseNum : ""
        params["checkingName"] = options.approvementObject ? options.approvementObject.checkingName : ""
        params["otherReasons"] = options.approvementObject ? options.approvementObject.other : ""
        params["organName"] =options.approvementObject ? options.approvementObject.organName : ""
        params["rukName"] = options.approvementObject ? options.approvementObject.rukName : ""
        params["sphereName"] =options.approvementObject ? options.approvementObject.sphereName : ""
        params["tematikName"] =options.approvementObject ? options.approvementObject.tematikName : ""
        console.log(params)

        axios.get(url, {params: params}).then(res => {
            let _nodes = []
            const _edges = res.data.edges;
            console.log(res.data)
            
            _edges.map(item => {
                setEdgeSettings(item);
            })
        
            res.data.nodes.map(item => {
                setNodeSettings(item, options.iin1, options.iin2)
                _nodes.push(item);
            })
            
            setNodes(nodes)
            setEdges(edges)

            graJSON.nodes = _nodes
            graJSON.edges = _edges
            
            setIsLoading(false)

            const fileInput = document.getElementById('file-upload')
            fileInput.value = ""

            setShowActionBtn(true)
            Network.stabilize()
        })
    };

    const shortOpen = (openLimit, showRels) => {
        console.log(openLimit, showRels)
        
        axios.get("http://localhost:9091/api/finpol/main/shortopen", {params: {id: SelectedNode.options.id, relations: showRels, limit: openLimit }}).then(res => {
            let _nodes = []
            const edgesFinal = res.data.edges;
            let _edges = []

            edgesFinal.filter(item => 
            (!ids.includes(item.to) || !ids.includes(item.from))).
            map(item => {
                _edges.push(item)
            })

            _edges.map(item => {
                setEdgeSettings(item);

                setEdges(() => [...edges, item])
            })

            res.data.nodes.map(item => {
                setNodeSettings(item)

                _nodes.push(item)
                setNodes(() => [...nodes, item]);
                setIds(() => [...ids, item.id])
            })

            setEdges([..._edges, ...edges])

            Network.body.data.nodes.update(_nodes)
            Network.body.data.edges.update(_edges)
            graJSON.nodes = nodes
            graJSON.edges = edges

            Network.fit({});
        })
    }

    const shortHide = () => {
        edges.map(item => {
            if (item.to === SelectedNode.options.id) { 
                removeNode(item.from)
            }

            if (item.from === SelectedNode.options.id) {
                removeNode(item.to)
            }

        })

      removeNode(SelectedNode.options.id)

      nodes.map(nodeItem => {
        let hasEdge = false

        edges.map(edgeItem => {
          if (edgeItem.to == nodeItem.id || edgeItem.from == nodeItem.id) {
            hasEdge = true
          }
        })

        if (!hasEdge) {
          let removeIndex = nodeStack.indexOf(nodeItem.id)
          Network.body.data.nodes.remove([{id: nodeItem.id}]);

          let tempNodeStack = nodeStack
          tempNodeStack.splice(removeIndex, 1)
          setNodeStack(tempNodeStack)
        }
      })

    }

    const removeNode = (id) => {
        let tempNodeStack = nodeStack

        let selectedIndex = tempNodeStack.indexOf(SelectedNode.options.id)
        let removeIndex = tempNodeStack.indexOf(id)

        if (removeIndex < selectedIndex) return

        if (id != keyNodeId) {
            Network.body.data.nodes.remove([{id: id}]);

            tempNodeStack.splice(removeIndex, 1) 
            setNodeStack(tempNodeStack)
        }
    }

    const setEdgeSettings = (edge) => {
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

    const cropLabel = (label) => {
        let labelChunkArr = label.match(/.{1,60}/g)
        let cropedLabel = ""
        labelChunkArr.forEach(elem => {
            if (cropedLabel == "") cropedLabel = elem
            else cropedLabel += ('\n' + elem)
        })

        return cropedLabel
    }

    const setNodeSettings = (node, iin1, iin2) => {
        setIds(() => [...ids, node.id])

        let key = false

        if (node.properties.Type == "????" || node.properties.Type == "????") {
            // settings for ul
            node.label = node.properties.Name;

            if (node.label.length > 60) { 
                node.label = cropLabel(node.label)
                console.log(node.physics)
            }
            

            const p = node.properties;
            if (p.nomer_sdelki) {
                node.group = "notarius"

            } else if (p.STATUS_OPG != null || p.STATYA_ERDR != null || p.ORGAN_REGISTER != null) {
                node.group = "judgeCompany"

            } else if (p.IINBIN == iin1 || p.IINBIN == iin2) {
                setKeyNodeId(node.id);
                node.group = "keyCompany"

                setNodeStack([node.id, ...nodeStack])

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

            key = false;
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
        }

        if (key) {
            setKeyNodeId(node.id); 
            setNodeStack([node.id, ...nodeStack])
        }

        if (!nodeStack.includes(node.id))
            setNodeStack(() => [...nodeStack, node.id])

    }

    const manipulation = {
    }

    const events = {
        selectNode: (event) => {
            setPhysicsEnable(false)
            setShowNodeInfo(true)
            setShowEdgeInfo(false)
            setShowImage(false)
            setShowSudInfo(false)

            console.log(Network)
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

                setShowImage(true)
                if (!SelectedNode.options.photoDbf) {
                    nodeImage.innerHTML = `<h3>?????? ????????</h3>`
                } else {
                    nodeImage.innerHTML = `<img src="data:image/png;base64, ${SelectedNode.options.photoDbf.photo}"/>`
                }
                    
                assignInfoBlock({
                    "??????": sp.IIN || "?????? ??????-??",
                    "??????": sp.FIO.split(" ")[1] || "?????? ??????", 
                    "??????????????": sp.Familia || "?????? ??????????????",
                    "??????": sp.FIO || "?????? ??????",
                    "????????????????": sp.Otchestvo || "?????? ????????????????",
                    "???????? ????????????????": sp.Data_Rozhdenya || "?????? ???????? ????????????????"
                }, '#nodeInfoInner')

                assignInfoBlock({
                    "class": "Person",
                    "PersonID": sp.PersonID,
                    "Label": sp.Label,
                    "Source": sp.Source,
                }, '#nodeAddInfoInner')

                assignInfoBlock({"??????????????": sp.Autditor}, '#nodeAddInfoInner')
                assignInfoBlock({"????????????????": sp.Notarius}, '#nodeAddInfoInner')
                assignInfoBlock({"??????????????": sp.Advocat}, '#nodeAddInfoInner')
                assignInfoBlock({"??????????????": sp.Autditor}, '#nodeAddInfoInner')
                assignInfoBlock({"?????????????? ???????????????? ??????????????????????": sp.Sud_ispolnitel}, '#nodeAddInfoInner')
                
            } else if (sg == "judgeCompany" || sg == "company" || sg == "keyCompany") {
            
                assignInfoBlock({
                    "????????????????????????": sp.Name,
                    "??????/??????": sp.IINBIN, 
                    "??????": sp.Type,
                }, '#nodeInfoInner')

                assignInfoBlock({
                    "class": sp.Name,
                    "PersonID": sp.PersonID, 
                    "Label": sp.Label,
                    "Source": sp.Source,
                }, '#nodeAddInfoInner')

                assignInfoBlock({"??????????????????": sp.Buhgalter}, '#nodeAddInfoInner') 
                assignInfoBlock({"??????": sp.NDS}, '#nodeAddInfoInner') 

            } else if (sg == 'PROPISKA') {

                assignInfoBlock({
                    "????????????????": sp.Stroenie,
                    "??????": sp.PKA, 
                    "??????????????": sp.Oblast,
                    "??????????": sp.Rayon,
                    "??????????": sp.Gorod,
                    "????????????????": sp.Kvartira,
                    "??????????": sp.Ulica,
                    "????????????": sp.Korpus,
                    "?????????? ????????????????": sp.Adress_propiski,
                }, '#nodeInfoInner')

                assignInfoBlock({
                    "class": sp.Name,
                    "?????? ??????????????": sp.Kod_oblasti, 
                    "?????? ????????????": sp.Kod_Strani, 
                    "?????? ????????????": sp.Kod_rayona, 
                    "PersonID": sp.PersonID, 
                    "Label": sp.Label,
                    "Source": sp.Source,
                }, '#nodeAddInfoInner')

                assignInfoBlock({"??????. ??????.": sp.Med_org,}, '#nodeSudInfoInner')
            }

            if (sg == 'judgePerson' || sg == 'keyJudgePerson' || sg == 'judgeCompany') {
                setShowSudInfo(true)

                assignInfoBlock({"??????. ??????.": sp.Med_org,}, '#nodeSudInfoInner')
                assignInfoBlock({"?????????????????????? ?? ???????????????????????? ????????????": sp.Pristavanie,}, '#nodeSudInfoInner')
                assignInfoBlock({"??????????, ?????????????????? ????????????????????????????": sp.Organ_pravanarushenya,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????? ??????????????": sp.Data_reshenya,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ????????": sp.Status_KUIS,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ?????????????????????? ????????????": sp.Razmer_Shtrafa,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ????????????????": sp.Status_Minzdrav,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ?? ???????????? ?? ???????????????????????????????? ??????????": sp.PRIKAZ_O_SNYATYA,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????????????????????? ????": sp.BEZDEYSTVIA_UL,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ??????": sp.STATUS_OPG,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ????????": sp.STATYA_ERDR,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????? ????????": sp.STATUS_ERDR,}, '#nodeSudInfoInner')
                assignInfoBlock({"?????????? ??????????????????????": sp.ORGAN_REGISTER,}, '#nodeSudInfoInner')
                assignInfoBlock({"??????": sp.FPG,}, '#nodeSudInfoInner')
                assignInfoBlock({"???????????????????? ??": sp.Napravlenio_V,}, '#nodeSudInfoInner')

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

        setShowNodeInfo(false)
        setShowEdgeInfo(false)
        setShowImage(false)
        setShowSudInfo(false)

      },

      selectEdge: (event) => {
        if (onSelectNode == true) return


        setShowNodeInfo(false)
        setShowEdgeInfo(true)
        setShowImage(false)
        setShowSudInfo(false)

        SelectedEdge = edges.filter(elem => elem.properties.id == Object.keys(Network.selectionHandler.selectionObj.edges)[0])[0]

        console.log(SelectedEdge)

        const infoBlock = document.querySelector("#nodeInfoInner")
        const addInfoBlock = document.querySelector("#nodeAddInfoInner")
        const sudInfoBlock = document.querySelector("#nodeSudInfoInner")
        addInfoBlock.innerHTML = ""
        infoBlock.innerHTML = ""
        sudInfoBlock.innerHTML = ""

        const sp = SelectedEdge.properties
        assignInfoBlock({
          "id": sp.id,
          "?????? ??????????": sp.Vid_svyaziey,
          "Label": sp.Label,
          "Source": sp.Source
        }, '#nodeInfoInner')

        if (SelectedEdge.type == "REG_ADDRESS_HIST" || SelectedEdge.type == "REG_ADDRESS_CUR" || SelectedEdge.type == "REG_ADDRESS") {
          assignInfoBlock({
            "???????? ???????????? ????????????????": sp.Data_nachali_propiski || sp.data_nachalo,
            "???????? ?????????????????? ????????????????": sp.data_oconchanya,
            "???????? ???????????????????????????????? ????????????????": sp.data_reg,
            "??????????": sp.address_of_reg,
            "??????": sp.rka,
          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == "WORKER_CUR" || SelectedEdge.type == "WORKER_HIST") {
          assignInfoBlock({
            "??????/?????? ????????????????????????": sp.IINBIN_rabotadatelya,
            "??????": sp.IIN,
            "???????? ???????????? ???????????????????? ??????/????": sp.data_nachalo,
            "???????? ?????????????????? ???????????????????? ??????/????": sp.data_oconchanya,
            "?????????????? ???????????????????? ??????????": sp.average_zp,
            "???????????????????? ?????????????? ???????????????????? ????????????????????": sp.mesyac_pensionnih,
            "???????????????????? ????????????????????": sp.pensionnoe_otchislenie,
            "???????????????????? ????????????????????": sp.soc_ochislenya,
            "?????????????? ???????????????????? ??????????": sp.average_zp,

          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == 'SUDIM') {
          assignInfoBlock({
            "???????? ???????????? ????????????????????": sp.Data_nachala,
            "???????? ?????????? ????????????????????": sp.Data_konca,
            "????????????": sp.Statya,

          }, '#nodeInfoInner')

        } else if (SelectedEdge.type == 'UCHILSYA') {
          assignInfoBlock({
            "???????? ???????????? ????????????????": sp.data_nachalo, 
            "???????? ?????????? ????????????????": sp.data_konca
          }, '#nodeInfoInner')

        } else {
          assignInfoBlock({
            "????????????????": sp.company,
            "???????? ???????????? ????????????????????????????????": sp.Data_nachalo_affilirovannosti,
            "?????? ????????????????????????????????": sp.Type_affilirovannosti,
            "??????/?????? ????????????????????????": sp.IINBIN_rabotadatelya,
            "???????????????????????? ???????? ?????????????????? ???? ??????????????": sp.naimenovanie_tipa_dolzhnosty,
            "???????????????????????? ???????? ?????????????????? ???? ??????????????": sp.NAME_tipa_dolzhnosty,
            "???????? ????????????": sp.data_nachalo,
            "???????? ??????????????????": sp.data_oconchanya,
            "??????": sp.IIN,
            "?????????? ?????????? ??????": sp.obshaya_summa,
            "?????? ???? 2019 ??????": sp.esf_2019,
            "?????? ???? 2020 ??????": sp.esf_2020,
            "?????? ???? 2021 ??????": sp.esf_2021,
            "?????? ???? 2022 ??????": sp.esf_2022,
            "??????-?????? ????????????????????": sp.IINBIN_postavshika,
            "?????? ??????????????????": sp.BIN_zakazchika,
            "???????????????? ??????????, ?????? ??????": sp.itog_summa,
            "????????": sp.data,
            "?????????? ????????????": sp.nomer_sdelki,
            "?????? ????????????": sp.type_sdelki,
            "??????????????????????????": sp.predstavitel,
            "??????": sp.pdl,
            "??????": sp.rka,
            "?????? ????????????": sp.god_sluzhbi,
            "????????????????": sp.opisanie
          }, '#nodeInfoInner')

        }
      },

      deselectEdge: (event) => {
        setShowNodeInfo(false)
        setShowEdgeInfo(false)
        setShowImage(false)
        setShowSudInfo(false)
      }

    }

    const search = () => {
        updateSearched()
        showSearched()
    }

    const update = () => {
        setNodes([])
        setEdges([])
    }

    const searchNext = () => {
        setSliderPage(sliderPage + 1);
        if (sliderPage >= searchedNodes.length) {
            setSliderPage(0);
        }

        showSearched();
    }

    const searchPrev = () => {
        setSliderPage(sliderPage - 1);
        if (sliderPage < 0) {
            setSliderPage(searchedNodes.length - 1);
        }

        showSearched();
    }

    const updateSearched = () => {
        const value = document.getElementById("nodeSearchInput").value;

        const searchNodes = Object.values(Network.body.nodes).filter(elem => {
            for ( var key in elem.options.properties) {
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

        setSliderPage(0);
        setSearchedNodes(searchNodes);
    }

    const showSearched = () => {
        const item = searchedNodes[sliderPage];

        item && Network.focus(item.id, {
            scale: 1.5,
            offset: {
            x: 0,
            y: 0
            },
        })
    }

    const handleLayout = (layout) => {
        setLayoutOptions(prev => ({
            ...prev,
            hierarchical: layout
        }))

        setPhysicsEnable(!layout.enabled)
        console.log(physicsEnable)
        console.log(layoutOptions)
    }

    useEffect(() => {
        setUpdateGraph(prev => !prev)
    }, [physicsEnable])

    const download = () => {
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
    
    const exportBt = () => {
        const fileName = "graph.txt"
        const fileContent = JSON.stringify(graJSON, null, 2)
        const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"})
        const url = URL.createObjectURL(blob)

        let first = ""
        let second = ""

        if (graJSON.typeOfSearch == "con1") {
            if (graJSON.iin) {
                first = graJSON.params.person
                second = ""

            } else {
                first = "??????????????: " + graJSON.params.lastName1 + ", ??????: " + graJSON.params.firstName1 + ", ????????????????: " + graJSON.params.fatherName1
                second = "" 
            }

        } else if (graJSON.typeOfSearch == "con2") {
            if (graJSON.iin) {
                first = graJSON.params.person
                second = graJSON.params.person2

            } else {
                first = "??????????????: " + graJSON.params.lastName1 + ", ??????: " + graJSON.params.firstName1 + ", ????????????????: " + graJSON.params.fatherName1
                second = "??????????????: " + graJSON.params.lastName2 + ", ??????: " + graJSON.params.firstName2 + ", ????????????????: " + graJSON.params.fatherName2
            }

        } else if (graJSON.typeOfSearch == "con3") {
            if (graJSON.iin) {
                first = graJSON.params.person
                second = graJSON.params.ul

            } else {
                first = "??????????????: " + graJSON.params.lastName1 + ", ??????: " + graJSON.params.firstName1 + ", ????????????????: " + graJSON.params.fatherName1
                second = graJSON.params.ul
            }

        } else if (graJSON.typeOfSearch == "con4") {
            first = graJSON.params.ul
            second = ""

        } else if (graJSON.typeOfSearch == "con5") {
            first = graJSON.params.ul1
            second = graJSON.params.ul2

        }

        axios.get("http://localhost:9091/api/finpol/main/downloadedscheme", {params: {first: first, second: second}})

        const link = document.createElement("a")
        link.download = fileName;
        link.href = url;
        link.click();
    }

    const importBt = (file) =>  {
        setIsLoading(true)
        setIds([])

        console.log(file )

        const res = JSON.parse(file)
        console.log(res)

        let _nodes = []
        const _edges = res.edges;
        graJSON.typeOfSearch = res.typeOfSearch

        _edges.map(item => {
            setEdgeSettings(item);
        })
        
        res.nodes.map(item => {
            setNodeSettings(item)

            setIds(() => {
                return [ids, item.id]
            })
            _nodes.push(item);
        })

        setCounter(currCounter => currCounter + 1)
        console.log(counter)

        setNodes(_nodes)
        setEdges(_edges)

        console.log("from GRAPHSJS IMPORTBT", nodes, edges)

        graJSON.nodes = _nodes
        graJSON.edges = _edges
        graJSON.paramsOfSearch = res.paramsOfSearch
        graJSON.typeOfSearch = res.typeOfSearch
        
        setIsLoading(false)
        setShowActionBtn(true)

        return graJSON
    }

    if (counter === 0 && !isLoading) {
        return (
            <div className='mainSection'>
                <LeftBar handleLayout={handleLayout} update={update} importBt={importBt} exportBt={exportBt} handleSubmit={Submit}></LeftBar>
                <div className='centralBar'>
                    <div className="waiterBox">
                        <i id="waiter" className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
        )

    } else if (counter !== 0 && nodes.length === 0 && !isLoading) {
        return (
            <div className='mainSection'>
                <LeftBar handleLayout={handleLayout} update={update} importBt={importBt} exportBt={exportBt} handleSubmit={Submit}></LeftBar>
                <div className='centralBar'>
                    <div className="waiterBox">
                        <a>No objects found</a>
                    </div>
                </div>
            </div>
        )

    } else if (isLoading && nodes.length === 0) {
        return (
            <div className='mainSection'>
                <LeftBar handleLayout={handleLayout} update={update} importBt={importBt} exportBt={exportBt} handleSubmit={Submit}></LeftBar>
                <div className='centralBar'>
                    <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>
                </div>
            </div>
        )

    } else { 
        return (
            <div className='mainSection'>
                <LeftBar handleLayout={handleLayout} params={graJSON} update={update} downloadScheme={download} exportBt={exportBt} handleSubmit={Submit}></LeftBar>
                <div className='centralBar' id="centralBar">
                    <div className="nodeSearch">
                        <div>
                            <input type="text" id="nodeSearchInput" placeholder="?????????? ???? ??????????" 
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        if(event.target.value != "") search(event.target.value) 
                                        else Network.fit({});
                                    }
                                }}
                                onChange={event => {
                                    if (event.target.value == "") Network.fit({});
                                }}
                            />

                            <i className="fa-solid fa-magnifying-glass"
                                onClick={() => search()}>
                            </i>

                        </div>
                        <div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4UlEQVR4nK3UMUoDQRSH8V2wiDaWCvZ24hHEVgjewCt4hO//hl3YZk9gZ+0NAiktUwqW6dOl0sInKw6kyIqZfV85xY/h8WaqKqY6yKkq4E7SUwR0DjxLckmLKVYNPACbX8yLwZTSFfC6A3kR2Pf9MSBJH3swPwg0s1tJ7yOQ/xts2/ZsZ+g+Baz3DL0MBC6B5QGQj4Jd150CqwLM/7rhkaRHSdsQMNc0zQXwEgbmzGwuaR0GDgEnw1IDnyFgLqV0PfLsfMrnMLaji1Lwp/yKgK8QMGdmN8BbGDgEzMzsPh98A4cThMeOLdocAAAAAElFTkSuQmCC"
                                onClick={() => searchPrev()}/>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nK3UPQ4BURiF4RFKKjW1hFZiEaKhtg3le+5MMsmUSq1yWguwA7EIYgNEITHiLxTCNfOd5LRPMnPy3SB4pRRYBuhLmiVJUrMCB5IySVtgZAlmjy6ApiWYAXtJkzRNyyagXvDKOdc1A3XvSdLUezR+g89unXNDSzB7jhZFUcMS/D4aOcBHjx9/QU5wCbQsPnkHjL/ePx4gcAbmcRzXC68MrIHeT8gDPFyXBCrBP+EzmP+B4A0ENl7X4AHe7hWoFsKuCcOwDXSKQhcGtZXbAfm2YgAAAABJRU5ErkJggg=="
                                onClick={() => searchNext()}/>
                        </div>
                    </div>

                    <Graph
                        graph={{nodes: nodes, edges: edges}}
                        options={graphOptions}
                        events={events}
                        getNetwork={network => {
                            Network = network;
                        }}
                        manipulation={manipulation}
                        className={"graph"}
                        updateGraph={updateGraph}
                    />
                </div>          
                <RightBar showAction={showActionBtn} shortOpen={shortOpen} shortHide={shortHide} isOnSelectNode={showNodeInfo} isOnSelectEdge={showEdgeInfo} showImage={showNodeImage} showSudInfo={showSudInfo}></RightBar>
            </div>
        )
    }
}

export default GraphNetnew;