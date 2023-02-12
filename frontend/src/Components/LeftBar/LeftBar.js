import React, {Component} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'
import { useNavigate } from "react-router-dom";

const LeftBar = (props) => {
    const navigate = useNavigate()

    let options = {
        iin: "",
        iin2: "",
        limit: 0,
        depth: 0,
        mode: "",
        categories: {
            acted_in: false,
            directed: false,
            produced: false,
            wrote: false,
            reviewed: false,
            follows: false,

        },
        relations: ""
    }
    const filter = (event) => { 
        if (!checkAuth()) navigate('/login', {replace: true}) 

        options.relations = ""
        Object.keys(options.categories).forEach(key => {
            if (options.categories[key]) {
                if (options.relations == "") options.relations = key
                else options.relations += "," + key
            }
        })
        console.log(options.relations)
        props.handleSubmit(options).bind(this)
    }
    const clearOptions = () => {
        options.iin = "";
        options.iin2 = "";
        options.limit = 0;
        options.mode = "";

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

        options.categories[parent.id] = !options.categories[parent.id];

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
                            options.mode = document.getElementById("connections").value;
                            let input1 = document.getElementsByClassName("formBlock")[1];
                            let input2 = document.getElementsByClassName("formBlock")[2];
                            let input3 = document.getElementsByClassName("formBlock")[3];
                            let input4 = document.getElementsByClassName("formBlock")[4];
                            let input5 = document.getElementsByClassName("formBlock")[5];

                            if (options.mode === "con1") {
                                input1.style.display = 'flex';
                                input2.style.display = 'none';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
                            } 
                            else if (options.mode ==="con2") {
                                input1.style.display = 'flex';
                                input2.style.display = 'flex';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
                            }
                            else if (options.mode ==="con3") {
                                input1.style.display = 'flex';
                                input2.style.display = 'flex';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
                            }
                            else if (options.mode === "con4") {
                                input1.style.display = 'flex';
                                input2.style.display = 'none';
                                input3.style.display = 'flex';
                                input4.style.display = 'flex';
                                input5.style.display = 'flex';
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
                    <label for="IIN">Объект</label>
                    <input type="text" 
                        // value=""
                        onChange={event => {options.iin = event.target.value}} 
                        id="input_IIN" 
                        className="input_IIN" 
                        name="input_IIN" 
                        placeholder="Введите ИИН"
                        />
                </div>

                <div className="formBlock">
                    <label for="IIN">Второй объект</label>
                    <input type="text" 
                        // value=""
                        onChange={event => {options.iin2 = event.target.value}} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="input_IIN" 
                        placeholder="Введите ИИН"
                        />
                </div>
                <div className="formBlock">
                    <label for="IIN">LIMIT</label>
                    <input type="number" 
                        // value=""
                        onChange={event => {options.limit = event.target.value}} 
                        id="input_IIN2"
                        className="input_IIN" 
                        name="input_IIN" 
                        placeholder="Введите лимит объектов"
                        />
                </div>
                <div className="formBlock">
                <label for="IIN">DEPTH</label>
                <input type="number" 
                    // value=""
                    onChange={event => {options.depth = event.target.value}} 
                    id="input_IIN2"
                    className="input_IIN" 
                    name="input_IIN" 
                    placeholder="Введите глубину поиска"
                    />
            </div>

                <div className="formBlock">
                    <label for="IIN">Вид связи</label>
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