import React, {Component} from "react";
import ReactDOM, { render } from "react-dom";

class LeftBar extends Component {
    options = {
        iin: "",
        iin2: "",
        conType: "",
        connections: {
            con1: true,
            con2: true,
            con3: true
        }
    }
    filter = (event) => {
        // alert("ffasf");
        if (this.options.conType == "con1") {
            this.props.handleSubmit(this.options).bind(this);
        } else {
            this.props.handleSubmitConn(this.options).bind(this);
        }
    }
    render() {
        return (
            <div className='leftBar'>
                <form 
                    // onSubmit={event => this.props.handleSubmit(event).bind(this) return false;}
                    >
                    <div>
                        <label for="connections">Вид связи</label>
                        <select name="connections" id='connections' onChange={event => {this.options.conType = document.getElementById("connections").value}}>
                            <option value="con1">Связь одного</option>
                            <option value="con2">Связь между объектами</option>
                        </select>
                    </div>
    
                    <div>
                        <label for="IIN">Введите ИИН</label>
                        <input type="text" 
                            // value=""
                            onChange={event => {this.options.iin = event.target.value}} 
                            id="input_IIN" 
                            name="input_IIN" 
                            placeholder="IIN"
                            />
                    </div>
                    <div>
                        <label for="IIN2">Введите ИИН</label>
                        <input type="text" 
                            // value=""
                            onChange={event => {this.options.iin2 = event.target.value}} 
                            id="input_IIN2" 
                            name="input_IIN2" 
                            placeholder="IIN2"
                            />
                    </div>
                    
                    {/* <div className='checkboxBlock'>
                        <div>
                            <input 
                                type="checkbox" 
                                id="connections conAll" 
                                name="allCon" value="allCon" 
                                onChange={event => {
                                    this.options.connections.con1 = true;
                                    this.options.connections.con2 = true;
                                    this.options.connections.con3 = true;

                                    if (event.target.checked) {
                                        document.getElementById("connection1").checked = true;
                                        document.getElementById("connection2").checked = true;
                                        document.getElementById("connection3").checked = true;

                                        this.options.connections.con1 = true;
                                        this.options.connections.con2 = true;
                                        this.options.connections.con3 = true;
                                    } else {
                                        document.getElementById("connection1").checked = false;
                                        document.getElementById("connection2").checked = false;
                                        document.getElementById("connection3").checked = false;

                                        this.options.connections.con1 = false;
                                        this.options.connections.con2 = false;
                                        this.options.connections.con3 = false;
                                    }
                                }}/>
                            <label id="conLabel" for="allCon">Все связи</label>
                        </div>
                        <div>
                            <input type="checkbox" id="connection1" name="con1" value="con1" onChange={event => {this.options.connections.con1 = event.target.checked}}/>
                            <label id="conLabel" for="con1">Con1</label>
                        </div>
                        <div>
                            <input type="checkbox" id="connection2" name="con2" value="con2" onChange={event => {this.options.connections.con1 = event.target.checked}}/>
                            <label id="conLabel" for="con2">Con2</label>
                        </div>
                        <div>
                            <input type="checkbox" id="connection3" name="con3" value="con3" onChange={event => {this.options.connections.con1 = event.target.checked}}/>
                            <label id="conLabel" for="con3">Con3</label>
                        </div>
                    </div> */}
    
                    <div>
                        <input type="button" value="Filter" id="filterBtn" 
                        onClick={event => this.filter(event)}
                        />
                    </div>
                </form>
            </div>
        )

        
    }
}

export default LeftBar;