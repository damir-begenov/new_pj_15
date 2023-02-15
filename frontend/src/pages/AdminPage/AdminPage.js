import React, { Component } from "react";
import axios from 'axios';

import './AdminPage.css'
import UsersTable from "../../Components/UsersTable/UsersTable";


const check = (props) => {

}

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    state = {
        users: 0,
        logs: 0
    }

    componentDidMount() {
        axios.get(`http://localhost:9091/api/finpol/main/general`)
        .then(res => {
            this.setState({users: res.data.allRequsetNum, logs: res.data.todayRequsetNum})
    })
    }

    render() {
        return (
            <section>
                <div className="countStats">
                    <div className="lastQuery">
                        <div>Количество посещений</div>
                        <div>1123</div>
                    </div>

                    <div>
                        <div>Количество пользователей</div>
                        <div>{this.state.users}</div>
                    </div>

                    <div>
                        <div>Количество запросов</div>
                        <div>{this.state.logs}</div>
                    </div>
                </div>
                <div>
                    <UsersTable></UsersTable>
                </div>
          </section>
        );
    }
}

export default AdminPage;