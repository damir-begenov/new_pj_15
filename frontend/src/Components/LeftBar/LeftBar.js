import React, {useState, Component} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'
import { useNavigate } from "react-router-dom";

const LeftBar = (props) => {
    const navigate = useNavigate()

    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const [limit, setLimit] = useState(0)
    const [depth, setDepth] = useState("")

    const [mode, setMode] = useState("")
    const [categories, setCategories] = useState({
        ACTED_IN: false,
        DIRECTED: false,
        PRODUCED: false,
        WROTE: false,
        REVIEWED: false,
        FOLLOWS: false
    })

    const filter = (event) => { 
        if (!checkAuth()) navigate('/login', {replace: true}) 

        let relations = ""
        Object.keys(categories).forEach(key => {
            if (categories[key]) {
                if (relations == "") relations = key
                else relations += "," + key
            }
        })

        let options = {
            name1, name2, limit, depth, mode, relations
        }

        console.log("in left bar", options)
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
        cat[parent.id] = !cat[parent.id]

        setCategories(cat)

        // options.categories[parent.id] = !options.categories[parent.id];

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

    return (
        <div className='leftBar'>
            <form 
                >
                <div className="formBlock">
                    <label for="connections">Режим поиска</label>
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
                            <option value="none">Выберите режим</option>
                            <option value="con1">Раскрыть сзязи Фл</option>
                            <option value="con2">Фл - Фл</option>
                            <option value="con3">Фл - Юл</option>
                            <option value="con4">Раскрыть связи Юл</option>
                        </select>
                    </div>
                </div>

                <div className="formBlock">
                    <label>Объект</label>
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
                    <label>Второй объект</label>
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
                    <label>LIMIT</label>
                    <input type="number" 
                        // value=""
                        onChange={event => { setLimit(event.target.value) }} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="limit" 
                        placeholder="Введите лимит объектов"
                        />
                </div>
                <div className="formBlock">
                <label>DEPTH</label>
                <input type="number" 
                    // value=""
                    onChange={event => {setDepth(event.target.value)}} 
                    id="input_IIN2"
                    className="input_IIN" 
                    name="depth" 
                    placeholder="Введите глубину поиска"
                    />
            </div>

                <div className="formBlock">
                    <label>Вид связи</label>
                    <div className="checkBoxBlock checkedBlock" id="checkedBlock">
                        
                    </div>

                    <div className="checkBoxBtns">
                        <div onClick={(event) => checkAll(event)}>Применить все</div>
                        <div onClick={(event) => uncheckAll(event)}>Убрать все</div>
                    </div>    

                    <div className="checkBoxBlock" id="uncheckedBlock">
                        <div className="checkBox unchecked" id="ACTED_IN">
                            <span id="conLabel">acted_in</span>
                            <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>
                        <div className="checkBox unchecked" id="DIRECTED">
                            <span id="conLabel">directed</span>
                            <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>
                        <div className="checkBox unchecked" id="PRODUCED">
                            <span id="conLabel">produced</span>
                            <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>
                        <div className="checkBox unchecked" id="WROTE">
                            <span id="conLabel">wrote</span>
                            <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>
                        <div className="checkBox unchecked" id="REVIEWED">
                            <span id="conLabel">reviewed</span>
                            <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>
                        <div className="checkBox unchecked" id="FOLLOWS">
                            <span id="conLabel">follows</span>
                            <i class="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>
                    </div>
                </div>

                <div className="btn-block formBlock">
                    <input type="button" value="Очистить" id="clearBtn" 
                    onClick={event => clearOptions()}
                    />
                    <input type="button" value="Запустить" id="filterBtn" 
                    onClick={event => filter(event)}
                    />
                </div>
            </form>
        </div>
    )
}

export default LeftBar;