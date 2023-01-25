import React, {Component} from "react";
import ReactDOM, { render } from "react-dom";

class LeftBar extends Component {
    options = {
        iin: "",
        iin2: "",
        date: Date,
        date2: Date,
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
        this.mode = "";

        document.getElementById("input_IIN").value = "";
        document.getElementById("input_IIN2").value = "";
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
        // Object.keys(this.options.categories).forEach(key => {
        //     this.options.categories[key] = true;
        // });

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

                                if (this.options.mode === "con2" || this.options.mode === "con3" || this.options.mode === "con4") { // Фл
                                    input1.style.display = 'flex';
                                    input2.style.display = 'flex';
                                    input3.style.display = 'none';
                                    input4.style.display = 'none';
                                }
                                else if (this.options.mode === "con1"){ // ФЛ + ФЛ
                                    input1.style.display = 'flex';
                                    input2.style.display = 'none';
                                    input3.style.display = 'none';
                                    input4.style.display = 'none';
                                } 
                                else if (this.options.mode ==="con5") { // ЮЛ + Время
                                    input1.style.display = 'flex';
                                    input2.style.display = 'none';
                                    input3.style.display = 'flex';
                                    input4.style.display = 'flex';
                                }
                            }}>
                                <option value="none">Выберите режим</option>
                                <option value="con1">Раскрыть сзязи Фл</option>
                                <option value="con2">Фл - Фл</option>
                                <option value="con3">Фл - Юл</option>
                                <option value="con4">Юл - Юл</option>
                                <option value="con5">Юл + Интервал времени</option>
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
                        <label for="IIN">Начало интервала</label>
                        <input type="date" 
                            // value=""
                            onChange={event => {this.options.date = event.target.value}} 
                            id="input_date"
                            className="input_IIN" 
                            name="input_IIN" 
                            />
                    </div>

                    <div className="formBlock">
                        <label for="IIN">Конец интервала</label>
                        <input type="date" 
                            // value=""
                            onChange={event => {this.options.date2 = event.target.value}} 
                            id="input_date2"
                            className="input_IIN" 
                            name="input_IIN" 
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
                            <div className="checkBox unchecked" id="rel_final">
                                <span id="conLabel">rel_final</span>
                                <i class="fa-solid fa-plus" onClick={(event) => this.checkUncheck(event)}></i>
                            </div>
                            <div className="checkBox unchecked" id="rel_final1">
                                <span id="conLabel">rel_final_2</span>
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