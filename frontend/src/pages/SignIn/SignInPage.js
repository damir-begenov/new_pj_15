import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form"
import SignInForm from "../../Components/SignInForm/SignInForm";

export default class RegistrationPage extends Component {
    render() {
        return (
            <section>
                <div className="title">
                    <div>NEXUS</div>
                    <div>LOGIN</div>
                </div>

                <SignInForm></SignInForm>

            </section>
        )
    }
}