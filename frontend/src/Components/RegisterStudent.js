import { Component } from "react";


export default class RegisterStPage extends Component {
    render() {
        return (
                <form>
                    <div className="registerForm">
                    <label>Name</label>
                    <input placeholder="Name"></input>
                    <label>IIN</label>
                    <input placeholder="IIN"></input>
                    <label>Company</label>
                    <input placeholder="Company"></input>
                    <label>Label</label>
                    <input placeholder="Label"></input>
                    <label>Start Date</label>
                    <input placeholder="Start"></input>
                    </div>
                </form>
        )
    }
}