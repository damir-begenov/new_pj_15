import React, {useState, Component} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'
import { useNavigate } from "react-router-dom";

const LeftBar = (props) => {
    const navigate = useNavigate()

    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const [limit, setLimit] = useState(20)
    const [depth, setDepth] = useState(1)

    const [modal, setModal] = useState(false)

    const [mode, setMode] = useState("")
    const [categories, setCategories] = useState({
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
        IP: {
            value: "IP",
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
    })

    const filter = (event) => { 
        if (!checkAuth()) navigate('/login', {replace: true}) 

        let relations = ""
        Object.keys(categories).forEach(key => {
            if (categories[key].checked) {
                if (relations == "") relations = key
                else relations += "," + key
            }
        })

        console.log(relations)

        let options = {
            name1, name2, limit, depth, mode, relations
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

        uncheckAll("");
        document.getElementById("input_date").value = "";
        document.getElementById("input_date2").value = "";
    }

    const checkUncheck = (event) => {
        const checkedBlock = document.getElementById("checkedBlock");
        const uncheckedBlock = document.getElementById("uncheckedBlock");
        let parent, element;

        try {
            parent = event.target.parentNode;
            element = event.target;
        } catch {
            parent = event.parentNode;
            element = event;
        }

        let cat = categories
        console.log(categories[parent.id])

        let prevState = cat[parent.id].checked;

        if (categories[parent.id].level === 0) {
            cat[parent.id].checked = !cat[parent.id].checked
        } 
        else if (categories[parent.id].level === 1 && (checkAdmin() || checkModerator())) {
            cat[parent.id].checked = !cat[parent.id].checked
        }
        else if (categories[parent.id].level === 2 && checkAdmin()) {
            cat[parent.id].checked = !cat[parent.id].checked
        }


        setCategories(cat)



        if (prevState != categories[parent.id].checked)
            if (parent.classList[1] == "checked") {
                element.classList.remove("fa-xmark");
                element.classList.add("fa-plus");
                
                parent.classList.remove("checked");
                parent.classList.add("unchecked");

                uncheckedBlock.appendChild(parent);
            } else {
                element.classList.remove("fa-plus");
                element.classList.add("fa-xmark");
                
                parent.classList.remove("unchecked");
                parent.classList.add("checked");

                checkedBlock.appendChild(parent);
            }
    }
    const checkAll = (event) => {
        const uncheckedBlock = document.getElementById("uncheckedBlock");
        let uncheckeds = [...uncheckedBlock.childNodes];

        uncheckeds.forEach((item) => {
            checkUncheck(item.childNodes[1]);
        })
    }
    const uncheckAll = (event) => {
        const checkedBlock = document.getElementById("checkedBlock");
        let checkeds = [...checkedBlock.childNodes];

        checkeds.forEach((item) => {
            checkUncheck(item.childNodes[1]);
        })
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
                                input1.style.display = 'flex';
                                input2.style.display = 'none';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
                            } 
                            else if (value ==="con2") {
                                input1.style.display = 'flex';
                                input2.style.display = 'flex';
                                input3.style.display = 'none';
                                input4.style.display = 'none';
                                input5.style.display = 'flex';
                            }
                            else if (value ==="con3") {
                                input1.style.display = 'flex';
                                input2.style.display = 'flex';
                                input3.style.display = 'none';
                                input4.style.display = 'none';
                                input5.style.display = 'flex';
                            }
                            else if (value === "con4") {
                                input1.style.display = 'flex';
                                input2.style.display = 'none';
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
                    <label>По каким связам хотите?</label>
                    <div className="checkBoxBlock checkedBlock" id="checkedBlock">
                        {Object.keys(categories).filter((key) => categories[key].checked && categories[key].level == 0).map((key, index) => {
                            return (
                                <div className="checkbox checked" id={key} key={index}>
                                    <span id="conLabel">{categories[key].value}</span>
                                    <i class="fa-solid fa-xmark" onClick={(event) => checkUncheck(event)}></i>
                                </div>  
                            )
                        })}
                    </div>

                    <div className="checkBoxBtns">
                        <div onClick={(event) => checkAll(event)}>Применить все</div>
                        <div onClick={(event) => uncheckAll(event)}>Убрать все</div>
                    </div>    

                    <div className="checkBoxBlock" id="uncheckedBlock">
                        {Object.keys(categories).filter((key) => !categories[key].checked && categories[key].level == 0).map((key, index) => {
                            return (
                                <div className="checkbox unchecked" id={key} key={index}>
                                    <span id="conLabel">{categories[key].value}</span>
                                    <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                                </div>  
                            )
                        })}

                        {checkAdmin() || checkModerator() ?
                            Object.keys(categories).filter((key) => !categories[key].checked && categories[key].level == 1).map((key, index) => {
                                return (
                                    <div className="checkbox unchecked" id={key} key={index}>
                                        <span id="conLabel">{categories[key].value}</span>
                                        <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                                    </div>  
                                )
                            })
                            : ""
                        }

                        {checkAdmin() ?
                            Object.keys(categories).filter((key) => !categories[key].checked && categories[key].level == 2).map((key, index) => {
                                return (
                                    <div className="checkbox unchecked" id={key} key={index}>
                                        <span id="conLabel">{categories[key].value}</span>
                                        <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                                    </div>  
                                )
                            })
                            : ""
                        }
                    </div>
                </div>

                <div className="btn-block formBlock">
                    <input type="button" value="Очистить" id="clearBtn" 
                    onClick={event => clearOptions()}
                    />
                    <input type="button" value="Запустить" id="filterBtn" 
                    onClick={event => setModal(true)}
                    />
                </div>

            </form>

            {modal ?
            (<div className="modalBlock" 
            // onClick={() => setModal(false)}
            >
                <div className="modalWindow">

                    <div className="title">Approve title</div>

                    <div className="modalItems">
                        <div className="modalItem">
                            <label>Выбрать</label>
                            <select name="approvements" id='approvements'>
                                <option value="app_1">Reason 1</option>
                                <option value="app_2">Reason 2</option>
                                <option value="app_3">Reason 3</option>
                            </select>
                        </div>
                        
                        <div className="modalItem">
                            <label>Выбрать</label>
                            <input type="text"></input>
                        </div>
                        
                        <div className="modalItem">
                            <label>Выбрать</label>
                            <input type="text"></input>
                        </div>
                        
                        <div className="modalItem">
                            <label>Выбрать</label>
                            <input type="text"></input>
                        </div>
                        
                        <div className="modalItem">
                            <label>Выбрать</label>
                            <input type="text"></input>
                        </div>

                        <div className="modalItem actionItems">
                            <input onClick={ () => setModal(false) } type="button" value="Отмена"/>
                            <input onClick={filter} type="button" value="Отправить"/>
                        </div>
                    </div>
                </div>
            </div>) : ("")}
        </div>
    )
}

export default LeftBar;