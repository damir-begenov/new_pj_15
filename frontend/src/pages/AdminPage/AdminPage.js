import React, { Component, useEffect, useState } from "react";
import axios from 'axios';

import './AdminPage.css'
import UsersTable from "../../Components/UsersTable/UsersTable";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPage = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()    

    const [users, setUsers] = useState(0)
    const [logs, setLogs] = useState(0)

    const location = useLocation()

    useEffect(() => {
        const a = !userSession.roles.includes("ADMIN") ? navigate('/') : ""

        axios.get(`http://localhost:9091/api/finpol/main/general`)
        .then(res => {
            setUsers(res.data.allRequsetNum)
            setLogs(res.data.todayRequsetNum)

            console.log(this.location)
        })
    })

    return (
        <section>
            <div className="countStats">
                <div className="lastQuery">
                    <div>Количество посещений</div>
                    <div>1123</div>
                </div>

                <div>
                    <div>Количество пользователей</div>
                    <div>{users}</div>
                </div>

                <div>
                    <div>Количество запросов</div>
                    <div>{logs}</div>
                </div>
            </div>
            <div>
                <UsersTable></UsersTable>
            </div>
        </section>
    );
}

export default AdminPage;