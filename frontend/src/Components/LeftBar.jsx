import React from "react";
import ReactDOM from "react-dom";

function LeftBar() {
    return (
        <div className='leftBar'>
            <form>
                <div>
                    <label for="connections">Вид связи</label>
                    <select name="connections" id='connections'>
                        <option value="con1">Con1</option>
                        <option value="con2">Con2</option>
                    </select>
                </div>

                <div>
                    <label for="input_IIN">Введите ИИН</label>
                    <input type="text" id="input_IIN" name="input_IIN" placeholder="IIN"/>
                </div>
                
                <div className='checkboxBlock'>
                    <div>
                        <input type="checkbox" id="connection" name="allCon" value="allCon"/>
                        <label id="conLabel" for="allCon">Все связи</label>
                    </div>
                    <div>
                        <input type="checkbox" id="connection" name="con1" value="con1"/>
                        <label id="conLabel" for="con1">Con1</label>
                    </div>
                    <div>
                        <input type="checkbox" id="connection" name="con2" value="con2"/>
                        <label id="conLabel" for="con2">Con2</label>
                    </div>
                    <div>
                        <input type="checkbox" id="connection" name="con3" value="con3"/>
                        <label id="conLabel" for="con3">Con3</label>
                    </div>
                </div>

                <div>
                    <input type="submit" value="Filter" id="filterBtn"/>
                </div>
            </form>
        </div>
    );
}

export default LeftBar;