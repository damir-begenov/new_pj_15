import React, { useState } from "react";
import './relationBlock.css'

const RelationBlock = (props) => {
    const [categories, setCategories] = useState({
        BUHGALTER: {
            value: "Бухгалтер",
            checked: true,
            level: 0
        },
        DETDOM_HIST: {
            value: "Детдом",
            checked: true,
            level: 0
        },
        DFO_AFF_FIZ: {
            value: "ДФО-Фл",
            checked: true,
            level: 0
        },
        DFO_AFF_UL: {
            value: "ДФО-Юл",
            checked: true,
            level: 0
        },
        DIRECTOR_CUR: {
            value: "Нынешний Директор",
            checked: true,
            level: 0
        },
        DIRECTOR_HIST: {
            value: "Бывший Директор",
            checked: true,
            level: 0
        },
        FOUNDER_CUR: {
            value: "Нынешний Учредитель",
            checked: true,
            level: 0
        },
        FOUNDER_HIST: {
            value: "Бывший Учредитель",
            checked: true,
            level: 0
        },
        ESF_100: {
            value: "ЭСФ100М+",
            checked: true,
            level: 0
        },
        ESF_10and100: {
            value: "ЭСФ1М-10М",
            checked: true,
            level: 0
        },
        ESF_10and50: {
            value: "ЭСФ10М-50М",
            checked: true,
            level: 0
        },
        ESF_50and100: {
            value: "ЭСФ50М-100М",
            checked: true,
            level: 0
        },
        ESF_5and10: {
            value: "ЭСФ500-1М",
            checked: true,
            level: 0
        },
        FPG: {
            value: "ФПГ",
            checked: true,
            level: 0
        },
        GOSZAKUP: {
            value: "ГОСЗАКУП",
            checked: true,
            level: 0
        },
        IP: {
            value: "IP",
            checked: true,
            level: 0
        },
        IP_KX: {
            value: "ИП-КХ",
            checked: true,
            level: 0
        },
        NTR_FL: {
            value: "Нотариус Фл",
            checked: true,
            level: 0
        },
        NTR_UL_FL: {
            value: "Нотариус Фл",
            checked: true,
            level: 0
        },
        OPG: {
            value: "ОПГ",
            checked: true,
            level: 0
        },
        PDL: {
            value: "ПДЛ",
            checked: true,
            level: 0
        },
        REG_ADDRESS: {
            value: "АДРЕС-РЕГИСТР",
            checked: true,
            level: 0
        },
        REG_ADDRESS_CUR: {
            value: "АДРЕС-НЫНЕШНИЙ",
            checked: true,
            level: 0
        },
        REG_ADDRESS_HIST: {
            value: "АДРЕС-СТАРЫЙ",
            checked: true,
            level: 0
        },
        REG_ADDRESS_UL: {
            value: "АДРЕС-ЮЛ",
            checked: true,
            level: 0
        },
        SLUZHIL: {
            value: "Служил",
            checked: true,
            level: 0
        },
        SUDIM: {
            value: "Судим",
            checked: true,
            level: 0
        },
        UCHILSYA: {
            value: "Образование",
            checked: true,
            level: 0
        },
        WORKER_CUR: {
            value: "НЫНЕШНИЙ РАБОТНИК",
            checked: true,
            level: 0
        },
        WORKER_HIST: {
            value: "БЫВШИЙ РАБОТНИК",
            checked: true,
            level: 0
        },
        ZAGS: {
            value: "ЗАГС",
            checked: true,
            level: 0
        },
        ZAGS_FIO: {
            value: "ЗАГС-ФИО",
            checked: true,
            level: 0
        },
        ZAGS_IIN: {
            value: "ЗАГС-ИИН",
            checked: true,
            level: 0
        },
    })

    const checkUncheck = (event) => {
        const checkedBlock = document.getElementById("checkedBlock");
        const uncheckedBlock = document.getElementById("uncheckedBlock");
        let parent, element;

        try {
            parent = event.target.parentNode;
            element = event.target;
        } catch {
            parent = event.parentNode;
            element = event;
        }

        let cat = categories
        let prevState = cat[parent.id].checked;

        console.log(cat, prevState)

        if (categories[parent.id].level === 0) {
            cat[parent.id].checked = !cat[parent.id].checked
        } 
        else if (categories[parent.id].level === 1 && (checkAdmin() || checkModerator())) {
            cat[parent.id].checked = !cat[parent.id].checked
        }
        else if (categories[parent.id].level === 2 && checkAdmin()) {
            cat[parent.id].checked = !cat[parent.id].checkedi
        }

        setCategories(cat)
        setRelations()
    }
    const checkAll = (event) => {
        const uncheckedBlock = document.getElementById("uncheckedBlock");
        let uncheckeds = [...uncheckedBlock.childNodes];

        uncheckeds.forEach((item) => {
            checkUncheck(item.childNodes[1]);
        })
    }
    const uncheckAll = (event) => {
        const checkedBlock = document.getElementById("checkedBlock");
        let checkeds = [...checkedBlock.childNodes];

        checkeds.forEach((item) => {
            checkUncheck(item.childNodes[1]);
            // console.log(item.childNodes[1])
        })
    }

    const checkAuth = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (!userSession) return false;
        return true;
    }

    const checkAdmin = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('ROLE_ADMIN')) {
            return true;
        }
        return false;
    }

    const checkModerator = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('ROLE_MODERATOR')) {
            return true;
        }
        return false;
    }

    const setRelations = () => {
        let relations = ""
        Object.keys(categories).forEach(key => {
            if (categories[key].checked) {
                if (relations == "") relations = key
                else relations += "," + key
            }
        })

        props.setRels(relations)
    }

    return (
        <>
        {setRelations()}
        <label>По каким связам хотите?</label>
        <div className="checkBoxBlock checkedBlock" id="checkedBlock">
            {Object.keys(categories).filter((key) => categories[key].checked && categories[key].level == 0).map((key, index) => {
                return (
                    <div className="checkbox checked" id={key} key={index}>
                        <span id="conLabel">{categories[key].value}</span>
                        <i className="fa-solid fa-xmark" onClick={(event) => checkUncheck(event)}></i>
                    </div>  
                )
            })}
        </div>

        <div className="checkBoxBtns">
            <div onClick={(event) => checkAll(event)}>Применить все</div>
            <div onClick={(event) => uncheckAll(event)}>Убрать все</div>
        </div>    

        <div className="checkBoxBlock" id="uncheckedBlock">
            {Object.keys(categories).filter((key) => !categories[key].checked && categories[key].level == 0).map((key, index) => {
                return (
                    <div className="checkbox unchecked" id={key} key={index}>
                        <span id="conLabel">{categories[key].value}</span>
                        <i className="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                    </div>  
                )
            })}

            {checkAdmin() || checkModerator() ?
                Object.keys(categories).filter((key) => !categories[key].checked && categories[key].level == 1).map((key, index) => {
                    return (
                        <div className="checkbox unchecked" id={key} key={index}>
                            <span id="conLabel">{categories[key].value}</span>
                            <i className="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>  
                    )
                })
                : ""
            }

            {checkAdmin() ?
                Object.keys(categories).filter((key) => !categories[key].checked && categories[key].level == 2).map((key, index) => {
                    return (
                        <div className="checkbox unchecked" id={key} key={index}>
                            <span id="conLabel">{categories[key].value}</span>
                            <i className="fa-solid fa-plus" onClick={(event) => checkUncheck(event)}></i>
                        </div>  
                    )
                })
                : ""
            }
        </div>
        </>
    )
} 

export default RelationBlock;