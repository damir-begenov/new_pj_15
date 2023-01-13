import { Component } from "react";
import { MenuData } from "../MenuData";

class Navbar extends Component {
    render() {
        return (
            <div className="nav-back">
                <nav className="NavbarItems">
                <h1 className="logo">Ww-tracker</h1>
                <ul className="nav-menu">
                    {MenuData.map((item, index)=> {
                        return (
                            <li key={index}><a className={item.cName} href={item.url}>{item.title}</a></li>
                        )
                    })}
                </ul>
            </nav>
            </div>
        )
    }
}

export default Navbar