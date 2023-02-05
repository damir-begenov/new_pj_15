import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

import './RegistrationPage.css'
import { useForm } from "react-hook-form"

import RegisterForm from "../../Components/RegisterForm/RegisterForm";

export default class RegistrationPage extends Component {
    render() {
        return (
            <section>
                <div className="title">
                    <div>NEXUS</div>
                    <div>REGISTER</div>
                </div>

                <RegisterForm></RegisterForm>
                {/* <form name="registrationForm" onSubmit={this.onSubmit}>

                    <div className="inputs">
                        <div className="firstLine">
                            <div>
                                <label >Логин</label>
                                <input type="text" name="login" id="login" placeholder="Введите логин"/>
                            </div>

                            <div>
                                <label >Уровень доступа</label>
                                <div className="level">
                                    <select name="level" id='level'>
                                        <option value="none" disabled selected>Выбрать уровень доступа</option>
                                        <option value="easy">Easy</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="secondLine">
                            <div>
                                <label >Пароль</label>
                                <input type="password" name="password" id="password" placeholder="Введите пароль"/>
                            </div>
                        </div>

                        <div className="thirdLine">
                            <div>
                                <label >Подтверждение пароля</label>
                                <input type="password" name="password-conf" id="password-conf" placeholder="Подтвердите пароль"/>
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        <Link to='/login'><a>Войти через окно</a></Link>
                        <input id="clear" type="button" value="Очистить"/>
                        <input id="register" type="submit" value="Зарегистрировать"/>
                    </div>
                </form> */}
            </section>
        )
    }
}