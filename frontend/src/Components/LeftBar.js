import React, {Component} from "react";
import ReactDOM, { render } from "react-dom";

class LeftBar extends Component {
    options = {
        iin: "",
        iin2: "",
        date: Date,
        conType: "",
    }
    filter = (event) => {
        this.props.handleSubmit(this.options).bind(this)
    }
    clearOptions = () => {
        this.options.iin = "";
        this.options.iin2 = "";
        this.conType = "";

        document.getElementById("input_IIN").value = "";
        document.getElementById("input_IIN2").value = "";
    }
    render() {
        return (
            <div className='leftBar'>
                <form 
                    // onSubmit={event => this.props.handleSubmit(event).bind(this) return false;}
                    >
                    <div className="formBlock">
                        <label for="connections">Вид связи</label>
                        <div className="select">
                            <select name="connections" id='connections' onChange={event => {
                                this.options.conType = document.getElementById("connections").value;
                                let input2 = document.getElementsByClassName("formBlock")[2];
                                let input3 = document.getElementsByClassName("formBlock")[3];

                                if (this.options.conType === "con2") {
                                    input2.style.display = 'flex';
                                    input3.style.display = 'none';
                                }
                                else if (this.options.conType === "con1"){
                                    input2.style.display = 'none';
                                    input3.style.display = 'none';
                                } else if (this.options.conType ==="con3") {
                                    input2.style.display = 'none';
                                    input3.style.display = 'flex';
                                }
                            }}>
                                <option value="none">Выберите режим</option>
                                <option value="con1">Один объект</option>
                                <option value="con2">Два объекта</option>
                                <option value="con3">Oбъект и дата</option>
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
                        <label for="IIN">Выберите дату</label>
                        <input type="date" 
                            // value=""
                            onChange={event => {this.options.date = event.target.value}} 
                            id="input_date"
                            className="input_IIN" 
                            name="input_IIN" 
                            />
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