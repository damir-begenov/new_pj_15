import { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class UsersTable extends Component {
    state = {
        value: "",
        users: [],
    }

    componentDidMount() {
        const userSession = JSON.parse(localStorage.getItem("user"))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(`http://localhost:9091/api/finpol/main/getusers`)
            .then(res => {
            const users = res.data;
            this.setState({ users });
            // console.log(res.data)
        })
    }

    setActive(userEvent, selectEvent) {
        console.log(userEvent, selectEvent)
        // /admin/user/ban/{id}
        axios.post('http://localhost:9091/api/finpol/main/admin/user/ban/'+userEvent.id)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    active(e) {
        if (e.active) {
            return (<td className="finished">
                        <select onChange={event => this.setActive(e, event)}>
                            <option selected>Активен</option>
                            <option>Не Активен</option>
                        </select>
                    </td>)
        } else {
            return (<td className="unfinished">
                        <select onChange={event => this.setActive(e, event)}>
                            <option>Активен</option>
                            <option selected>Не Активен</option>
                        </select>
                    </td>)
        }
    }

    search = async val => {
        axios
            .get('http://localhost:9091/api/finpol/main/admin/users', {params: {value: val}})
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }
    onChangeHandler = async e => {
        this.search(e.target.value)
        this.state.value = e.target.value
    }

    render() {
        return(
            <>
            <input value={this.state.value} onChange={e=> this.onChangeHandler(e)} type="text" className="searchUsers" placeholder="Поиск пользователей"></input>
                <table className="table adminPanelTable">
                    <thead >
                        <tr>
                            <th scope="col"><a className="sort">#</a></th>
                            <th scope="col"><a className="sort">ФИО</a></th>
                            <th scope="col"><a className="sort">Емайл</a></th>
                            <th scope="col"><a className="sort">Статус активности</a></th>
                        </tr>
                    </thead>
                    <tbody className="adminPanelTable">
                        
                        {this.state.users.map((user) => 
                            <tr className="row">
                                <td scope="row">{user.id}</td>
                                <td className="FIO">
                                    <Link className="rowInfo" 
                                    to={{
                                        pathname:`/users/${user.username}`, 
                                        state: {user: user}
                                    }}>{user.username}</Link>
                                </td>
                                <td>{user.email}</td>
                                {this.active(user)}
                                {/* {this.moderator(user)} */}
                            </tr>
                    
                    )}
                    </tbody>
                </table>
            </>
            )
    }
}