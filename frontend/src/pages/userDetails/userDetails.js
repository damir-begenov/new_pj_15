import { Component } from "react";
import { Link, useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from 'axios';

import TableLog from "../../Components/TableLog/TableLog";

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
            <div>
                <div>{this.state.user.username}</div>
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
                <th scope="row">{index+1}</th>
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
        )
    }
}

export default withParams(UserDetails);
