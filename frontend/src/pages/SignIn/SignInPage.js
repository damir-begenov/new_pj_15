import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form"
import SignInForm from "../../Components/SignInForm/SignInForm";
import './SignInPage.css'

export default class RegistrationPage extends Component {
    render() {
        return (
            <div className="signInBlock">
                    
                <section className="signInPageSection">
                    
                    <div className="title">
                        <div>iTap</div>
                        <div>login</div>
                    </div>

                    <SignInForm></SignInForm>

                </section>
            </div>

        )
    }
}