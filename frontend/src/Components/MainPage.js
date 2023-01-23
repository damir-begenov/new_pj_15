import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

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
                        <Link to='/searchtool'><a>TRY</a></Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}