import React, {useState, Component} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'
import { useNavigate } from "react-router-dom";

import RelationBlock from "../Relation/RelationBlock";
import ApprovementModalWindow from "../ApprovementModal/ApprovementModalWindow";
import LayoutController from "../LayoutController/LayoutController";

const LeftBar = (props) => {
    const navigate = useNavigate()
    const reader = new FileReader()

    const [iin1, setIIN1] = useState("")
    const [iin2, setIIN2] = useState("")

    const [searchOption, setSearchOption] = useState("iinOption")

    const [fname1, setFName1] = useState("")
    const [fname2, setFName2] = useState("")
    const [lname1, setLName1] = useState("")
    const [lname2, setLName2] = useState("")
    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")

    const [limit, setLimit] = useState(20)
    const [depth, setDepth] = useState(1)
    const [approvementObj, setApprovementObj] = useState({})

    const [modal, setModal] = useState(false)

    const [mode, setMode] = useState("")
    const [relString, setRelString] = useState("")

    const filter = (approvementObject) => { 
        console.log("approvement", approvementObject)
        const firstFamilia = document.getElementById('firstFamilia').value
        const firstName = document.getElementById('firstName').value
        const firstFatherName = document.getElementById('firstFatherName').value
        const secondFamilia = document.getElementById('secondFamilia').value
        const secondName = document.getElementById('secondName').value
        const secondFatherName = document.getElementById('secondFatherName').value
        
        if (firstFamilia == "starts") {
            setLName1(lname1 + '.*')
        } else if (firstFamilia == "include") {
            setLName1('.*' + lname1 + '.*')
        } else {
            setLName1('.*' + lname1)
        }
        if (firstName == "starts") {
            setName1(name1 + '.*')
        } else if (firstName == "include") {
            setName1('.*' + name1 + '.*')
        } else {
            setName1('.*' + name1)
        }
        if (firstFatherName == "starts") {
            setFName1(fname1 + '.*')
        } else if (firstFatherName == "include") {
            setFName1('.*' + fname1 + '.*')
        } else {
            setFName1('.*' + fname1)
        }
        if (secondFamilia == "starts") {
            setLName2(lname2 + '.*')
        } else if (secondFamilia == "include") {
            setLName2('.*' + lname2 + '.*')
        } else {
            setLName2('.*' + lname2)
        }
        if (secondName == "starts") {
            setName2(name2 + '.*')
        } else if (secondName == "include") {
            setName2('.*' + name2 + '.*')
        } else {
            setName2('.*' + name2)
        }
        if (secondFatherName == "starts") {
            setFName2(fname2 + '.*')
        } else if (secondFatherName == "include") {
            setFName2('.*' + fname2 + '.*')
        } else {
            setFName2('.*' + fname2)
        }

        let options = {
            iin1, iin2, limit, depth, mode, relString, approvementObject, searchOption, lname1, lname2, name1, name2, fname1, fname2
        }
        setModal(false)        
        props.handleSubmit(options)
    }

    const clearOptions = () => {
        setIIN1("")
        setIIN2("")
        setLimit(0)
        setMode("")

        document.getElementById("input_IIN").value = "";
        document.getElementById("input_IIN2").value = "";

        document.getElementById("input_date").value = "";
        document.getElementById("input_date2").value = "";

        document.querySelector("#file-upload").value = "";
    }

    const exportBt = () => {
        props.exportBt()
    }

    const downloadScheme = () => {
        props.downloadScheme()
    }

    const importBt = () => {
        const fileInput = document.getElementById('file-upload')
        const file = fileInput.files[0]
        let graJSON = {}
        reader.onload = event => {
            const fileContent = event.target.result
            props.update()
            graJSON = props.importBt(fileContent)

            console.log(graJSON)

            if (graJSON.typeOfSearch=="con1") {
                document.getElementById("connections").value = "con1"
            } else if (graJSON.typeOfSearch=="con2") {
                document.getElementById("connections").value = "con2"
            } else if (graJSON.typeOfSearch=="con3") {
                document.getElementById("connections").value = "con3"
            } else if (graJSON.typeOfSearch=="con4") {
                document.getElementById("connections").value = "con4"
            } else if (graJSON.typeOfSearch=="con5") {
                document.getElementById("connections").value = "con5"
            }

            let formSearchOptions = document.querySelector("#formSearchOptions");
            let iin1 = document.querySelector("#formIIN1");
            let iin2 = document.querySelector("#formIIN2");

            let formFio1 = document.querySelector("#formFio1")
            let formFio2 = document.querySelector("#formFio2")

            let formLimit = document.querySelector("#formLimit")
            let formDepth = document.querySelector("#formDepth")
            let formRels  = document.querySelector("#formRels")

            formSearchOptions.style.display = 'none'
            iin1.style.display = 'none'
            iin2.style.display = 'none'
            formFio1.style.display = 'none'
            formFio2.style.display = 'none'
            formLimit.style.display = 'none'
            formDepth.style.display = 'none'
            formRels.style.display = 'none'

        }

        reader.readAsText(file)
    }

    const checkAuth = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (!userSession) return false;
        return true;
    }

    const checkAdmin = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('ADMIN')) {
            return true;
        }
        return false;
    }

    const checkModerator = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('ROLE_MODERATOR')) {
            return true;
        }
        return false;
    }

    const handleLayout = (layout) => {
        props.handleLayout(layout)
    }

    return (
        <div className='leftBar'>
            <form >
                <div className="formBlock">
                    <label htmlFor="connections">Найти связи между</label>
                    <div className="select">
                        <select name="connections" id='connections' 
                        onChange={event => { 
                            let value = document.getElementById("connections").value;

                            let formSearchOptions = document.querySelector("#formSearchOptions");

                            let iin1 = document.querySelector("#formIIN1");
                            let iin2 = document.querySelector("#formIIN2");

                            let formFio1 = document.querySelector("#formFio1")
                            let formFio2 = document.querySelector("#formFio2")

                            let formLimit = document.querySelector("#formLimit")
                            let formDepth = document.querySelector("#formDepth")
                            let formRels  = document.querySelector("#formRels")

                            setMode(value)

                            if (value === "con1") {
                                iin1.childNodes[0].innerHTML = "Введите ИИН"

                                formSearchOptions.style.display = 'flex';

                                if (searchOption == "iinOption") {
                                    iin1.style.display = 'flex';
                                    iin2.style.display = 'none';
    
                                    formFio1.style.display = 'none';
                                    formFio2.style.display = 'none';

                                } else if (searchOption == "fioOption") {
                                    iin1.style.display = 'none';
                                    iin2.style.display = 'none';
    
                                    formFio1.style.display = 'flex';
                                    formFio2.style.display = 'none';
                                }
                                

                                formLimit.style.display = 'flex';
                                formDepth.style.display = 'flex';
                                formRels.style.display = 'flex';
                                props.update()
                            } 
                            else if (value ==="con2") {
                                iin1.childNodes[0].innerHTML = "Введите ИИН"
                                iin2.childNodes[0].innerHTML = "Введите второй ИИН"

                                formSearchOptions.style.display = 'flex';

                                if (searchOption == "iinOption") {
                                    iin1.style.display = 'flex';
                                    iin2.style.display = 'flex';

                                    formFio1.style.display = 'none';
                                    formFio2.style.display = 'none';

                                } else if (searchOption == "fioOption") {
                                    iin1.style.display = 'none';
                                    iin2.style.display = 'none';

                                    formFio1.style.display = 'flex';
                                    formFio2.style.display = 'flex';
                                }
                            
                                formLimit.style.display = 'none';
                                formDepth.style.display = 'none';

                                formRels.style.display = 'flex';
                                props.update()
                            }
                            else if (value ==="con3") {
                                iin1.childNodes[0].innerHTML = "Введите ИИН"
                                iin2.childNodes[0].innerHTML = "Введите БИН"

                                formSearchOptions.style.display = 'flex';

                                if (searchOption == "iinOption") {
                                    iin1.style.display = 'flex';
                                    iin2.style.display = 'flex';

                                    formFio1.style.display = 'none';
                                    formFio2.style.display = 'none';

                                } else if (searchOption == "fioOption") {
                                    iin1.style.display = 'none';
                                    iin2.style.display = 'flex';

                                    formFio1.style.display = 'flex';
                                    formFio2.style.display = 'none';
                                }

                                formLimit.style.display = 'none';
                                formDepth.style.display = 'none';

                                formRels.style.display = 'flex';
                                props.update()
                            }
                            else if (value === "con4") {
                                iin1.childNodes[0].innerHTML = "Введите БИН"

                                formSearchOptions.style.display = 'none';
                                
                                iin1.style.display = 'flex';
                                iin2.style.display = 'none';

                                formFio1.style.display = 'none';
                                formFio2.style.display = 'none';
                                
                                formLimit.style.display = 'flex';
                                formDepth.style.display = 'flex';

                                formRels.style.display = 'flex';
                                props.update()
                            }
                            else if (value === "con5") {
                                iin1.childNodes[0].innerHTML = "Введите БИН"
                                iin2.childNodes[0].innerHTML = "Введите второй БИН"

                                formSearchOptions.style.display = 'none';
                                
                                iin1.style.display = 'flex';
                                iin2.style.display = 'flex';

                                formFio1.style.display = 'none';
                                formFio2.style.display = 'none';
            
                                formLimit.style.display = 'none';
                                formDepth.style.display = 'none';

                                formRels.style.display = 'flex';
                                props.update()
                            }
                            else if (value === "none") {
                                formSearchOptions.style.display = 'none';

                                iin1.style.display = 'none';
                                iin2.style.display = 'none';

                                formFio1.style.display = 'none';
                                formFio2.style.display = 'none';

                                formLimit.style.display = 'none';
                                formDepth.style.display = 'none';
                                formRels.style.display = 'none';
                                props.update()
                            }
                        }}>
                            <option value="none">Выберите связь</option>
                            <option value="con1">Фл</option>
                            <option value="con4">Юл</option>
                            <option value="con2">Фл - Фл</option>
                            <option value="con3">Фл - Юл</option>
                            <option value="con5">Юл - Юл</option>
                        </select>
                    </div>
                </div>

                <div className="formBlock" id="formSearchOptions" style={{display: "none"}}>
                    <label htmlFor="searchOptions">Поиск по</label>
                    <div className="select">
                        <select name="searchOptions" id='searchOptions' value={searchOption}
                        onChange={event => {
                            let optionValue = document.getElementById("searchOptions").value;
                            let iin1 = document.querySelector("#formIIN1");
                            let iin2 = document.querySelector("#formIIN2");

                            let formFio1 = document.querySelector("#formFio1")
                            let formFio2 = document.querySelector("#formFio2") 

                            setSearchOption(optionValue)

                            if (optionValue == "fioOption") {
                                iin1.style.display = "none";
                                formFio1.style.display = "flex";

                                if (mode == "con5" || mode == "con2") {
                                    iin2.style.display = "none";
                                    formFio2.style.display = "flex";
                                }

                            } else if (optionValue == "iinOption") {
                                iin1.style.display = "flex";
                                formFio1.style.display = "none";

                                if (mode == "con5" || mode == "con3" || mode == "con2") {
                                    iin2.style.display = "flex";
                                    formFio2.style.display = "none";
                                }
                            }
                        }}>
                            <option value="iinOption">ИИН/БИН</option>
                            <option value="fioOption">ФИО</option>
                        </select>
                    </div>
                </div>

                <div className="formBlock" id="formIIN1" style={{display: "none"}}>
                    <label>Введите ИИН</label>
                    <input type="text" 
                        value={iin1}
                        onChange={event => { setIIN1(event.target.value) }} 
                        id="input_IIN" 
                        className="input_IIN" 
                        name="iin1" 
                        placeholder="Введите ИИН первого объекта"
                        />
                </div>

                <div id="formFio1" style={{display: "none"}}>
                    <div className="formBlock">
                        <label>Введите Фамилию первого объекта: </label>
                        <select id='firstFamilia'>
                            <option value="starts">Начинается с</option>
                            <option value="include">Включает</option>
                            <option value="ends">Заканчивается</option>
                        </select>
                        <input type="text" 
                            value={lname1}
                            onChange={event => { setLName1(event.target.value) }} 
                            id="input_FIO1_1" 
                            className="input_IIN" 
                            name="Fam1" 
                            placeholder=""
                            />
                    </div>

                    <div className="formBlock">
                        <label>Введите Имя первого объекта: </label>
                        <select id='firstName'>
                            <option value="starts">Начинается с</option>
                            <option value="include">Включает</option>
                            <option value="ends">Заканчивается</option>
                        </select>
                        <input type="text" 
                            value={name1}
                            onChange={event => { setName1(event.target.value) }} 
                            id="input_FIO1_2" 
                            className="input_IIN" 
                            name="name1" 
                            placeholder=""
                            />
                    </div>

                    <div className="formBlock">
                        <label>Введите Отчество первого объекта: </label>
                        <select id='firstFatherName'>
                            <option value="starts">Начинается с</option>
                            <option value="include">Включает</option>
                            <option value="ends">Заканчивается</option>
                        </select>
                        <input type="text" 
                            value={fname1}
                            onChange={event => { setFName1(event.target.value) }} 
                            id="input_FIO1_3" 
                            className="input_IIN" 
                            name="lname1" 
                            placeholder=""
                            />
                    </div>
                </div>

                <div className="formBlock" id="formIIN2" style={{display: "none"}}>
                    <label>Второй второй ИИН</label>
                    <input type="text" 
                        value={iin2}
                        onChange={event => { setIIN2(event.target.value) }} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="iin2" 
                        placeholder="Введите ИИН второго объекта"
                        />
                </div>

                <div id="formFio2" style={{display: "none"}}>
                    <div className="formBlock">
                        <label>Введите Фамилию второго объекта: </label>
                        <select id='secondFamilia'>
                            <option value="starts">Начинается с</option>
                            <option value="include">Включает</option>
                            <option value="ends">Заканчивается</option>
                        </select>
                        <input type="text" 
                            value={lname2}
                            onChange={event => { setLName2(event.target.value) }} 
                            id="input_FIO2_1" 
                            className="input_IIN" 
                            name="Fam2" 
                            placeholder=""
                            />
                    </div>

                    <div className="formBlock">
                        <label>Введите Имя второго объекта: </label>
                        <select id='secondName'>
                            <option value="starts">Начинается с</option>
                            <option value="include">Включает</option>
                            <option value="ends">Заканчивается</option>
                        </select>
                        <input type="text" 
                            value={name2}
                            onChange={event => { setName2(event.target.value) }} 
                            id="input_FIO2_2" 
                            className="input_IIN" 
                            name="fname2" 
                            placeholder=""
                            />
                    </div>

                    <div className="formBlock">
                        <label>Введите Отчество второго объекта: </label>
                        <select id='secondFatherName'>
                            <option value="starts">Начинается с</option>
                            <option value="include">Включает</option>
                            <option value="ends">Заканчивается</option>
                        </select>
                        <input type="text" 
                            value={fname2}
                            onChange={event => { setFName2(event.target.value) }} 
                            id="input_FIO2_3" 
                            className="input_IIN" 
                            name="lname2" 
                            placeholder=""
                            />
                    </div>  
                </div>      

                <div className="formBlock" id="formLimit" style={{display: "none"}}>
                    <label>Введите лимит:</label>
                    <input type="number" 
                        value={limit}
                        onChange={event => { setLimit(event.target.value) }} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="limit" 
                        placeholder="Введите лимит объектов"
                        />
                </div>

                <div className="formBlock" id="formDepth" style={{display: "none"}}>
                    <label>Введите уровень:</label>
                    <input type="number" 
                        value={depth}
                        onChange={event => {setDepth(event.target.value)}} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="depth" 
                        placeholder="Введите глубину поиска"
                        />
                </div>

                <div className="formBlock" id="formRels" style={{display: "none"}}>
                    <label>По каким связям хотите?</label>
                    <RelationBlock setRels={setRelString}></RelationBlock>
                </div>

                <div className="btn-block formBlock">
                    <div className="formActionBtnBlock">
                        <input type="button" value="Очистить" id="clearBtn" 
                            onClick={event => clearOptions()}
                        />

                        <input type="button" value="Запустить" id="filterBtn" 
                            onClick={event => {
                                if (!checkAdmin())
                                    setModal(true)
                                else 
                                    filter()
                            }}
                        />
                    </div>
                    
                    <div className="exportImportBtnBlock">
                        <div id="importBlock">
                            <input type="file" id="file-upload" 
                                onChange={event => importBt()} 
                            />
                        </div>
                        
                        <input type="button" value="Экспортировать данные" id="exportBtn" 
                            onClick={event => exportBt()}
                        />

                        <input type="button" value="Скачать схему" id="downloadScheme" 
                            onClick={event => downloadScheme()}
                        />  
                    </div>

                    
                </div>

                <div className="formBlock layoutControl">
                    <LayoutController handleLayout={handleLayout}></LayoutController>
                </div>
            </form>
            
            {modal ?
            <ApprovementModalWindow send={filter} setModal={setModal} setApprovementObj={setApprovementObj}></ApprovementModalWindow> : ("")}
        </div>
    )
}

export default LeftBar;