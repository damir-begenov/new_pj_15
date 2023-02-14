import { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';



export default class UsersTable extends Component {
    state = {
        users: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:9091/api/finpol/main/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
          })
      }

    active(e) {
        if (e.active) {
            return <td className="finished">True</td>
        } else {
            return <td className="unfinished">False</td>
        }
    }

    render() {
        return(
        <table className="table">
            <thead >
                <tr>
                <th scope="col"><a className="sort">#</a></th>
                <th scope="col"><a className="sort">Username</a></th>
                <th scope="col"><a className="sort">Email</a></th>
                <th scope="col"><a className="sort">Active</a></th>
                <th scope="col"></th>
                 </tr>
            </thead>
            <tbody>
                
                {this.state.users.map((user) => 
            <tr className="row">
                <th scope="row">{user.id}</th>
                <td className="FIO">
                    <Link className="rowInfo" 
                    to={{
                        pathname:`/users/${user.username}`, 
                        state: {user: user}
                    }}>{user.username}</Link>
                </td>
                <td>{user.email}</td>
                {this.active(user)}
            </tr>
            
            )}
            </tbody>
        </table>)
    }
}