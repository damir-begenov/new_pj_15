import React, { Component } from "react";

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

    componentDidMount() {
    }

    render() {
        return (
          <div>
            <UsersTable></UsersTable>
          </div>
        );
    }
}

export default AdminPage;