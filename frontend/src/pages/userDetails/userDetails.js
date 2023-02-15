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
        stat: {},
        logs: []
    }
    
    componentDidMount() {
        axios.get(`http://localhost:9091/api/finpol/main/statistic`, {params: {username: this.props.username.username}})
            .then(res => {
            const user = res.data;
            this.setState({user: user.user, stat: user, logs: user.logs})
            console.log(user.logs)
        })
    }


    render() {
        return(
            <div className="userDetailsBlock">
                <div>
                    <div className="userFirstBlock">
                        <div className="userInfo">
                            <div>
                                <span>
                                    Maku9
                                </span>
                                :
                                <span>
                                    ADMIN
                                </span>
                            </div>
                            <div>
                                maku9@mail.me
                            </div>
                        </div>
                        <div>
                            <button >PROMOTE</button>
                        </div>
                    </div>
                    
                    <div className="countStatsUser">
                        <div className="lastQuery">
                            <div>Последний запрос</div>
                            <div>16:30</div>
                            <div>2014/02/01</div>
                        </div>

                        <div>
                            <div>Количество запросов</div>
                            <div>118</div>
                        </div>

                        <div>
                            <div>Количество запросов сегодня</div>
                            <div>0</div>
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
                                <tr>
                                    <td scope="row">5</td>
                                    <td>02.03.2023</td>
                                    <td className="FIO">Maku9</td>
                                    <td>log.request_body</td>
                                    <td>300</td>
                                    <td>3</td>
                                    <td>ACTED_IN</td>
                                </tr>
                                {this.state.logs.map((log, index) => 
                                    <tr className="row">
                                        <td scope="row">{index+1}</td>
                                        <td>{log.date}</td>
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
