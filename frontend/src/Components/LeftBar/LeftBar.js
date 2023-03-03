import React, {useState, Component} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'
import { useNavigate } from "react-router-dom";

import RelationBlock from "../Relation/RelationBlock";
import ApprovementModalWindow from "../ApprovementModal/ApprovementModalWindow";

const LeftBar = (props) => {
    const navigate = useNavigate()

    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const [limit, setLimit] = useState(20)
    const [depth, setDepth] = useState(1)
    const [approvementObj, setApprovementObj] = useState({})

    const [modal, setModal] = useState(false)

    const [mode, setMode] = useState("")
    const [relString, setRelString] = useState("")

    const filter = () => { 
        if (!checkAuth()) navigate('/login', {replace: true}) 

        alert(relString)

        let options = {
            name1, name2, limit, depth, mode, relString, approvementObj
        }

        setModal(false)        
        props.handleSubmit(options).bind(this)
    }

    const clearOptions = () => {
        setName1("")
        setName2("")
        setLimit(0)
        setMode("")

        document.getElementById("input_IIN").value = "";
        document.getElementById("input_IIN2").value = "";

        document.getElementById("input_date").value = "";
        document.getElementById("input_date2").value = "";
    }

    const checkAuth = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (!userSession) return false;
        return true;
    }

    const checkAdmin = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        console.log(userSession)
        if (userSession && userSession.roles.includes('ROLE_ADMIN')) {
            return true;
        }
        return false;
    }

    const checkModerator = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        console.log(userSession)
        if (userSession && userSession.roles.includes('ROLE_MODERATOR')) {
            return true;
        }
        return false;
    }

    return (
        <div className='leftBar'>
            <form >
                <div className="formBlock">
                    <label for="connections">Найти связи между</label>
                    <div className="select">
                        <select name="connections" id='connections' 
                        onChange={event => {
                            let value = document.getElementById("connections").value;
                            let input1 = document.getElementsByClassName("formBlock")[1];
                            let input2 = document.getElementsByClassName("formBlock")[2];
                            let input3 = document.getElementsByClassName("formBlock")[3];
                            let input4 = document.getElementsByClassName("formBlock")[4];
                            let input5 = document.getElementsByClassName("formBlock")[5];

                            setMode(value)

                            if (value === "con1") {
                                input1.childNodes[0].innerHTML = "Введите ИИН"
                                input1.style.display = 'flex';
                                input2.style.display = 'none';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
                            } 
                            else if (value ==="con2") {
                                input1.childNodes[0].innerHTML = "Введите ИИН"
                                input2.childNodes[0].innerHTML = "Введите второй ИИН"
                                input1.style.display = 'flex';
                                input2.style.display = 'flex';
                                input3.style.display = 'none';
                                input4.style.display = 'none';
                                input5.style.display = 'flex';
                            }
                            else if (value ==="con3") {
                                input1.childNodes[0].innerHTML = "Введите ИИН"
                                input2.childNodes[0].innerHTML = "Введите БИН"
                                input1.style.display = 'flex';
                                input2.style.display = 'flex';
                                input3.style.display = 'none';
                                input4.style.display = 'none';
                                input5.style.display = 'flex';
                            }
                            else if (value === "con4") {
                                input1.childNodes[0].innerHTML = "Введите БИН"
                                input1.style.display = 'flex';
                                input2.style.display = 'none';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
                            }
                            else if (value === "con5") {
                                input1.childNodes[0].innerHTML = "Введите БИН"
                                input1.style.display = 'flex';
                                input2.childNodes[0].innerHTML = "Введите второй БИН"
                                input2.style.display = 'flex';
                                input3.style.display = 'none';
                                input4.style.display = 'none';
                                input5.style.display = 'flex';
                            }
                            else if (value === "none") {
                                input1.style.display = 'none';
                                input2.style.display = 'none';
                                input3.style.display = 'none';
                                input4.style.display = 'none';
                                input5.style.display = 'none';
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

                <div className="formBlock">
                    <label>Введите ИИН</label>
                    <input type="text" 
                        value={name1}
                        onChange={event => { setName1(event.target.value) }} 
                        id="input_IIN" 
                        className="input_IIN" 
                        name="name1" 
                        placeholder="Введите имя/название первого объекта"
                        />
                </div>

                <div className="formBlock">
                    <label>Второй второй ИИН</label>
                    <input type="text" 
                        value={name2}
                        onChange={event => { setName2(event.target.value) }} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="name2" 
                        placeholder="Введите имя/название второго объекта"
                        />
                </div>
                <div className="formBlock">
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
                <div className="formBlock">
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

                <div className="formBlock">
                    <RelationBlock setRels={setRelString}></RelationBlock>
                </div>

                <div className="btn-block formBlock">
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

            </form>

            {modal ?
            <ApprovementModalWindow send={filter} setModal={setModal} setApprovementObj={setApprovementObj}></ApprovementModalWindow> : ("")}
        </div>
    )
}

export default LeftBar;