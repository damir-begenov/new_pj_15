import React, {Component} from "react";
import ReactDOM from "react-dom";

import './../MainPage.css'

export default class MainPage extends Component {
    render() {
        return (
            
            <header>
                <div className="bgImage"></div>
                <div className="container">
                    <div className="comName">
                        <div>NEXUS</div>
                        <div>SERVICE</div>
                    </div>
                    <div className="actionBtn">
                        <div className="tryBtn">
                            <a>TRY</a>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}