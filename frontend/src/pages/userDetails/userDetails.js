import { Component } from "react";
import { Link, useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from 'axios';

import TableLog from "../../Components/TableLog/TableLog";
import './userDetails.css'

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
        role: ""
    }
    
    componentDidMount() {
        axios.get(`http://localhost:9091/api/finpol/main/statistic`, {params: {username: this.props.username.username}})
            .then(res => {
            const user = res.data;
            console.log(user)
            this.setState({user: user.user, date: user.date, allRequsetNum: user.todayRequsetNum, todayRequsetNum: user.todayRequsetNum, logs: user.logs})
            axios.get(`http://localhost:9091/api/finpol/main/role`, {params: {id: user.user.id}})
            .then(res => {
                this.setState({role: res.data})
            })
        })
    }

    promote = async e => {
        // axios.
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
                                {this.state.role.slice(5)}
                            </span>
                        </div>
                        <div>
                            {this.state.user.email}
                        </div>
                    </div>
                    <button onClick={e => this.promote(this.state.user.id)} >PROMOTE</button>
                    </div>
                    
                    
                    <div className="countStatsUser">
                        <div className="lastQuery">
                            <div>Последний запрос</div>
                            <div>{this.state.date.slice(11, 19)}</div>
                            <div>{this.state.date.slice(0, 10)}</div>
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
                        <table className="table">
                            <thead >
                                <tr>
                                    <th scope="col"><a className="sort">#</a></th>
                                    <th scope="col"><a className="sort">Date</a></th>
                                    <th scope="col"><a className="sort">Username</a></th>
                                    <th scope="col"><a className="sort">Request Body</a></th>
                                    <th scope="col"><a className="sort">LIMIT</a></th>
                                    <th scope="col"><a className="sort">DEPTH</a></th>
                                    <th scope="col"><a className="sort">RELATIONS</a></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.logs.map((log, index) => 
                                    <tr className="row">
                                        <td scope="row">{index+1}</td>
                                        <td>{log.date.slice(0, 10)} {log.date.slice(11, 19)}</td>
                                        <td className="FIO"><Link className="rowInfo" to={`/schools`}>{log.username}</Link></td>
                                        <td>{log.request_body}</td>
                                        <td>{log.limit_}</td>
                                        <td>{log.depth_}</td>
                                        <td>{log.request_rels}</td>
                                    </tr>
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
