import React, { Component } from "react";

import './AdminPage.css'

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
          <section>
                <div className="countStats">
                    <div>
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
            </section>  
        );
    }
}

export default AdminPage;