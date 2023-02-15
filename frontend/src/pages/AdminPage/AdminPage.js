import React, { Component } from "react";

import './AdminPage.css'
import UsersTable from "../../Components/UsersTable/UsersTable";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
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
                        <div>23</div>
                    </div>

                    <div>
                        <div>Количество запросов</div>
                        <div>1.2m</div>
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