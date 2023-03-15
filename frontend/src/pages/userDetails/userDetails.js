import { Component } from "react";
import { Link, useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from 'axios';

import TableLog from "../../Components/TableLog/TableLog";
import './userDetails.css'
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

function withParams(Component) {
    return props => <Component {...props} username={useParams()} />;
}

class UserDetails extends Component {
    state = {
        user: {},
        date: "", 
        allRequsetNum: 0,
        todayRequsetNum: 0,
        logs: [],
        role: "",
        newRole: 0,
        id: 0
    }
    
    componentDidMount = () => {
        axios.get(`http://localhost:9091/api/finpol/main/getuserdetails`, {params: {username: this.props.username.username}})
            .then(res => {
                const result = res.data
                console.log(res.data)
                let user = res.data.user
                let role = res.data.role
                let date = res.data.date
                this.setState({user: user, role: role, date: date, allRequsetNum: result.allRequsetNum, todayRequsetNum: result.todayRequsetNum, logs: result.logs})
            })
    }

    promote = async (e) => {
        const userSession = JSON.parse(localStorage.getItem("user"))

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(`http://localhost:9091/api/finpol/main/changeUserRole`, 
            { params: { 
                user: e, 
                role: this.state.newRole
            }})
        console.log(e)
        console.log(this.state.newRole)
        window.location.reload(false); 
    }

    rels = (e) => {
        console.log(e)

    }
    search = async val => {
        // console.log(this.state.user.id)
        axios
            .get('http://localhost:9091/api/finpol/main/admin/searchuserlogs', {params: {value: val, username: this.state.user.username}})
            .then(res => {
                const logs = res.data;
                this.setState({ logs });
            })
    }

    onChangeHandler = async e => {
        this.search(e.target.value)
        this.state.value = e.target.value
    }

    setNumbers = () => {
        if (this.state.date==null) {
            
                return(
                    <div>Нет даты</div> 
                )
        } else {
            return <>
        <div>{this.state.date.slice(11, 19)}</div>
        <div>{this.state.date.slice(0, 10)}</div></>
        }
    }

    // openInfo = (log) => {
    //     var form = document.getElementsByClassName("dopInfo")[log]
    //     if (form.style.display == "none") {
    //         form.style.display = "block"
    //         } else {
    //         form.style.display = "none"
    //         }
    //     }
    setVisible = (e) => {
        // console.log(e)
        const button = document.getElementById('dopInfaButton')
        const divka = document.getElementById(e)
        if (divka.style.visibility == 'visible') {
            // button.innerHTML =  '+'
            divka.style.visibility = 'collapse'
            divka.style.display = 'none'
        } else {
            // button.innerHTML =  '-'
            divka.style.visibility = 'visible'
            divka.style.display = 'table-cell'
        }
    }
    createBox = (log) => {
        return <td colSpan={"5"} className="dopInfa" id={log.id}>
            <p>
        {log.approvement_data}
            </p>
        </td>        
    }


    render() {
        return(
            <div className="userDetailsBlock">
                <div>
                    <div className="userFirstBlock">

                    <div className="userInfo">
                        <div>
                            <span>
                                {this.state.user.username} 
                            </span>
                            :
                            <span>
                                {this.state.role}
                            </span>
                        </div>
                        <div>
                            {this.state.user.email}
                        </div>
                    </div>
                    <select name="roles" id='connections' onChange={event=> {
                        let final;
                        if (event.target.value == "vip") {
                            final = 2
                        } else if (event.target.value == "1") {
                            final = 3
                        } else if (event.target.value == "2") {
                            final = 4
                        } else if (event.target.value == "3") {
                            final = 5
                        } 
                        this.setState({newRole: final})}
                        }>
                        <option>Уровень доступа</option>
                        <option value="vip">ВИП</option>
                        <option value="1">1 уровень</option>
                        <option value="2">2 уровень</option>
                        <option value="3">3 уровень</option>
                    </select>
                    <button className="changeRole" onClick={e => this.promote(this.state.user.id)} >Изменить</button>
                    </div>
                    
                    
                    <div className="countStatsUser">
                        <div className="lastQuery">
                            <div>Последний запрос</div>
                            {this.setNumbers()}
                        </div>

                        <div>
                            <div>Количество запросов</div>
                            <div>{this.state.allRequsetNum}</div>
                        </div>

                        <div>
                            <div>Количество запросов сегодня</div>
                            <div>{this.state.todayRequsetNum}</div>
                        </div>
                    </div>
                    <div>
                    <input value={this.state.value} onChange={e=> this.onChangeHandler(e)} type="text" className="searchUsers" placeholder="Поиск по запросам"></input>

                        <table className="table">
                            <thead >
                                <tr>
                                    <th scope="col"><a className="sort">#</a></th>
                                    <th scope="col"><a className="sort">Дата</a></th>
                                    <th scope="col"><a className="sort">Объект поиска</a></th>
                                    <th scope="col"><a className="sort">Запрос</a></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.logs.map((log, index) => 
                                <>
                                    <tr className="row">
                                        <td colSpan={"1"} scope="row">{index+1}</td>
                                        <td colSpan={"1"}>{log.date.slice(0, 10)} {log.date.slice(11, 19)}</td>
                                        <td colSpan={"1"}>{log.request_body}</td>
                                        <td colSpan={"1"}>{log.obwii}</td>
                                        <td colSpan={"1"} className="showLog" onClick={e => {
                                            this.setVisible(log.id)}
                                            }><a id="dopInfaButton" className="arrow-down">ИНФА</a></td>
                                    </tr>
                                    {this.createBox(log)}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default withParams(UserDetails);
