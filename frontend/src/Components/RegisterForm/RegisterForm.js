import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from 'react-router-dom';

import './RegisterForm.css'

import authService from "../../services/auth.service";

const RegisterForm = () => {
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        watch,
        formState: { errors } 
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            // level: "",
            password: "",
            password_conf: ""
        }
    });
    const handleRegistration = (data) => {
        console.log(data);
        authService.register(
            data.username,
            data.email,
            data.password
        ).then(
            response => {
                console.log(response)
                navigate('/login', { replace: true });
            },
            error => {
                console.log(error)
            }
        );
    }
    const handleErrors = (errors) => {
        console.log(errors)
    }

    const registerOptions = {
        username: { 
            required: "Username is required", 
            minLength: {
                value: 4,
                message: "Minimum length is 4"
            }
        },
        email: {
            required: "Email is required",
            validate: (val) => {
                if (val.length < 4) {
                    return "Email is invalid"
                }
            }
        },
        // level: { 
        //     required: "Level is required. Please choose уровень доступа" 
        // },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        },
        password_conf: {
            required: "Password confirmation is required",
            validate: (val) => {
                if(watch('password') != val) {
                    return "Your passwords do not match"
                }
            },
        }
    };

    return (
        <div>
            <form name="registrationForm" onSubmit={handleSubmit(handleRegistration, handleErrors)}>

                <div className="inputs">
                    <div className="firstLine">
                        <div>
                            <label >Логин</label>
                            <input 
                                type="text" 
                                {...register("username", registerOptions.username)} 
                                id="username" placeholder="Введите логин" 
                            />
                        </div>

                        {/* <div>
                            <label >Уровень доступа</label>
                            <div className="level">
                                <select {...register("level", registerOptions.level)} id='level'>
                                    <option value="" disabled selected>Выбрать уровень доступа</option>
                                    <option value="easy">Easy</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                        </div> */}
                    </div>

                    <div className="secondLine">
                        <div>
                            <label >Почта</label>
                            <input 
                                type="text" 
                                {...register("email", registerOptions.email)} 
                                id="email" placeholder="Введите почту" 
                            />
                        </div>
                    </div>

                    <div className="secondLine">
                        <div>
                            <label>Пароль</label>
                            <input type="password" {...register("password", registerOptions.password)} id="password" placeholder="Введите пароль"/>
                        </div>
                    </div>

                    <div className="thirdLine">
                        <div>
                            <label >Подтверждение пароля</label>
                            <input type="password" {...register("password_conf", registerOptions.password_conf)} id="password-conf" placeholder="Подтвердите пароль"/>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <Link to='/login'><a>Войти в аккаунт</a></Link>
                    <input id="clear" type="button" value="Очистить"/>
                    <input id="register" type="submit" value="Зарегистрировать"/>
                </div>

                {
                    Object.keys(errors).length != 0 ?
                    <div className="errorsBlock">
                        <div className="title">Invalid Registration</div>
                        <div className="errors">
                            {errors.username ? <span>{errors.username?.message}</span> : ""}
                            {errors.email ? <span>{errors.email?.message}</span> : ""}
                            {/* {errors.level ? <span>{errors.level?.message}</span> : ""} */}
                            {errors.password ? <span>{errors.password?.message}</span>: ""}
                            {errors.password_conf ? <span>{errors.password_conf?.message}</span> : ""}
                        </div>
                    </div> 
                    : ""
                }
            </form>
        </div>
    );
};

export default RegisterForm;