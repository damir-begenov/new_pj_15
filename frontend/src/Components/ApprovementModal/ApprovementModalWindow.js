import React from "react";
import { useState } from "react";
import './approvementModal.css'

const ApprovementModalWindow = (props) => {
    const [approvement, setApprovement] = useState("app_0")

    const UgDelo = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите номер (приказа) *</label>
                    <input type="text" name="orderNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Введите дату *</label>
                    <input type="text" name="orderDate" className="sendItem requiredItem" placeholder="01.01.23"/>
                </div>

                <div className="modalItem">
                    <label>Введите статью УК РК *</label>
                    <input type="text" name="articleName" className="sendItem requiredItem" placeholder="№"/>
                </div>
            </>
        )
    }
    const SledPoruchenie = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите номер (приказа) *</label>
                    <input type="text" name="orderNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Введите дату *</label>
                    <input type="text" name="orderDate" className="sendItem requiredItem" placeholder="01.01.23"/>
                </div>

                <div className="modalItem">
                    <label>Введите номер уголовного дела *</label>
                    <input type="text" name="caseNum" className="sendItem requiredItem" placeholder="№"/>
                </div>
            </>
        )
    }
    const PorProkurora = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите номер (приказа) *</label>
                    <input type="text" name="orderNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Введите дату *</label>
                    <input type="text" name="orderDate" className="sendItem requiredItem" placeholder="01.01.23"/>
                </div>

                <div className="modalItem">
                    <label>Введите номер уголовного дела *</label>
                    <input type="text" name="caseNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Проверка</label>
                    <input type="text" name="checkingName" className="sendItem" placeholder=""/>
                </div>

                <div className="modalItem">
                    <label>Введите иные основания</label>
                    <input type="text" name="other" className="sendItem" placeholder=""/>
                </div>
            </>
        )
    }
    const MejdPoruchenie = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите номер (приказа) *</label>
                    <input type="text" name="orderNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Введите дату *</label>
                    <input type="text" name="orderDate" className="sendItem requiredItem" placeholder="01.01.23"/>
                </div>

                <div className="modalItem">
                    <label>Введите название организации *</label>
                    <input type="text" name="organName" className="sendItem requiredItem" placeholder="Финпол"/>
                </div>
            </>
        )
    }
    const AfmPoruchenie = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите номер (приказа) *</label>
                    <input type="text" name="orderNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Введите дату *</label>
                    <input type="text" name="orderDate" className="sendItem requiredItem" placeholder="01.01.23"/>
                </div>
            </>
        )
    }
    const PoruchenieRukovodstva = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите номер (приказа) *</label>
                    <input type="text" name="orderNum" className="sendItem requiredItem" placeholder="№"/>
                </div>

                <div className="modalItem">
                    <label>Введите дату *</label>
                    <input type="text" name="orderDate" className="sendItem requiredItem" placeholder="01.01.23"/>
                </div>

                <div className="modalItem">
                    <label>Введите ФИО руководства *</label>
                    <input type="text" name="rukName" className="sendItem requiredItem" placeholder="Куанышбеков Мадияр Еркебуланулы"/>
                </div>
            </>
        )
    }
    const MaterialOP = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите название сферы *</label>
                    <input type="text" name="sphereName" className="sendItem requiredItem" placeholder=""/>
                </div>
            </>
        )
    }
    const TematikaAnalRabot = () => {
        return (
            <>
                <div className="modalItem">
                    <label>Введите название тематики *</label>
                    <input type="text" name="tematikName" className="sendItem requiredItem" placeholder=""/>
                </div>
            </>
        )
    }

    const validate = () => {
        let isValid = true

        const requiredElems = document.querySelectorAll('.requiredItem');
        requiredElems.forEach(elem => {
            if (elem.value.trim() === "") isValid = false
        })

        return isValid
    }

    const showError = () => {
        alert(`Заполните все обязательные поля (отмечены *)`)
    }

    const setApprovements = () => {
        const sendElems = document.querySelectorAll('.sendItem');
        let approvementss = {}
        sendElems.forEach(elem => {
            approvementss[elem.name] = elem.value
        })

        props.setApprovementObj(approvementss)
    }

    return (
        <div className="modalBlock">
            <div className="modalWindow">

                <div className="title">Основание проверки</div>

                <div className="modalItems">
                    <div className="modalItem">
                        <label>Выберите основание</label>
                        <select name="approvements" id='approvements' 
                            onChange={event => setApprovement(event.target.value)}>
                            <option value="app_0">Основание проверки</option>
                            <option value="app_1">Уголовное дело / ЕРДР</option>
                            <option value="app_2">Следственные поручения</option>
                            <option value="app_3">Поручения прокурора</option>
                            <option value="app_4">Международные поручения</option>
                            <option value="app_5">Поручения АФМ РК</option>
                            <option value="app_6">Поручения вышестоящего руководства</option>
                            <option value="app_7">Материалы оперативных проверок</option>
                            <option value="app_8">Тематика аналитической работы</option>
                        </select>
                    </div>
                    
                    {approvement == 'app_1' ? <UgDelo></UgDelo> : ""}
                    {approvement == 'app_2' ? <SledPoruchenie></SledPoruchenie> : ""}
                    {approvement == 'app_3' ? <PorProkurora></PorProkurora> : ""}
                    {approvement == 'app_4' ? <MejdPoruchenie></MejdPoruchenie> : ""}
                    {approvement == 'app_5' ? <AfmPoruchenie></AfmPoruchenie> : ""}
                    {approvement == 'app_6' ? <PoruchenieRukovodstva></PoruchenieRukovodstva> : ""}
                    {approvement == 'app_7' ? <MaterialOP></MaterialOP> : ""}
                    {approvement == 'app_8' ? <TematikaAnalRabot></TematikaAnalRabot> : ""}

                    <div className="modalItem actionItems">
                        <input onClick={ () => props.setModal(false) } type="button" value="Отмена"/>
                        <input disabled={approvement == 'app_0'} 
                            onClick={() => {
                                setApprovements()
                                if ( validate() ) {
                                    props.send()
                                } else {
                                    showError()
                                }
                            }
                        } type="button" value="Отправить"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApprovementModalWindow;