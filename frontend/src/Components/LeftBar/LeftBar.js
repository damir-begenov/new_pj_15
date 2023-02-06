import React, {Component} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'

class LeftBar extends Component {
    options = {
        iin: "",
        iin2: "",
        limit: 0,
        depth: 0,
        mode: "",
        categories: {
            rel_final: false,
            rel_final1: false
        }
    }
    filter = (event) => {
        this.props.handleSubmit(this.options).bind(this)
    }
    clearOptions = () => {
        this.options.iin = "";
        this.options.iin2 = "";
        this.options.limit = 0;
        this.mode = "";

        document.getElementById("input_IIN").value = "";
        document.getElementById("input_IIN2").value = "";

        this.uncheckAll("");

        document.getElementById("input_date").value = "";
        document.getElementById("input_date2").value = "";
    }

    checkUncheck = (event) => {
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

        this.options.categories[parent.id] = !this.options.categories[parent.id];

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
    checkAll = (event) => {
        const uncheckedBlock = document.getElementById("uncheckedBlock");
        let uncheckeds = [...uncheckedBlock.childNodes];

        uncheckeds.forEach((item) => {
            this.checkUncheck(item.childNodes[1]);
        })
    }
    uncheckAll = (event) => {
        const checkedBlock = document.getElementById("checkedBlock");
        let checkeds = [...checkedBlock.childNodes];

        checkeds.forEach((item) => {
            this.checkUncheck(item.childNodes[1]);
        })
    }

    render() {
        return (
            <div className='leftBar'>
                <form 
                    // onSubmit={event => this.props.handleSubmit(event).bind(this) return false;}
                    >
                    <div className="formBlock">
                        <label for="connections">Режим поиска</label>
                        <div className="select">
                            <select name="connections" id='connections' 
                            onChange={event => {
                                this.options.mode = document.getElementById("connections").value;
                                let input1 = document.getElementsByClassName("formBlock")[1];
                                let input2 = document.getElementsByClassName("formBlock")[2];
                                let input3 = document.getElementsByClassName("formBlock")[3];
                                let input4 = document.getElementsByClassName("formBlock")[4];
                                let input5 = document.getElementsByClassName("formBlock")[5];

                                if (this.options.mode === "con1") {
                                    input1.style.display = 'flex';
                                    input2.style.display = 'none';
                                    input3.style.display = 'flex';
                                    input4.style.display = 'flex';
                                    input5.style.display = 'flex';
                                } 
                                else if (this.options.mode ==="con2") {
                                    input1.style.display = 'flex';
                                    input2.style.display = 'flex';
                                    input3.style.display = 'flex';
                                    input4.style.display = 'flex';
                                    input5.style.display = 'flex';
                                }
                                else if (this.options.mode ==="con3") {
                                    input1.style.display = 'flex';
                                    input2.style.display = 'flex';
                                    input3.style.display = 'flex';
                                    input4.style.display = 'flex';
                                    input5.style.display = 'flex';
                                }
                                else if (this.options.mode === "con4") {
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
                            onChange={event => {this.options.iin = event.target.value}} 
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
                            onChange={event => {this.options.iin2 = event.target.value}} 
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
                            onChange={event => {this.options.limit = event.target.value}} 
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
                        onChange={event => {this.options.depth = event.target.value}} 
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
                            <div onClick={(event) => this.checkAll(event)}>Применить все</div>
                            <div onClick={(event) => this.uncheckAll(event)}>Убрать все</div>
                        </div>    

                        <div className="checkBoxBlock" id="uncheckedBlock">
                            <div className="checkBox unchecked" id="acted_in">
                                <span id="conLabel">acted_in</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                            <div className="checkBox unchecked" id="directed">
                                <span id="conLabel">directed</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                            <div className="checkBox unchecked" id="produced">
                                <span id="conLabel">produced</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                            <div className="checkBox unchecked" id="wrote">
                                <span id="conLabel">wrote</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                            <div className="checkBox unchecked" id="reviewed">
                                <span id="conLabel">reviewed</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                            <div className="checkBox unchecked" id="follows">
                                <span id="conLabel">follows</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                        </div>
                    </div>

                    <div className="btn-block formBlock">
                        <input type="button" value="Очистить" id="clearBtn" 
                        onClick={event => this.clearOptions()}
                        />
                        <input type="button" value="Запустить" id="filterBtn" 
                        onClick={event => this.filter(event)}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default LeftBar;