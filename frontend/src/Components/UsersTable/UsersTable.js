import { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class UsersTable extends Component {
    state = {
        users: [],
    }

    componentDidMount() {
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
                            <option selected>True</option>
                            <option>False</option>
                        </select>
                    </td>)
        } else {
            return (<td className="unfinished">
                        <select onChange={event => this.setActive(e, event)}>
                            <option>True</option>
                            <option selected>False</option>
                        </select>
                    </td>)
        }
    }

    // moderator(e) {
    //     console.log(e)
    //     let role = "ROLE_USER";
    //     e.roles.forEach(element => {
    //         console.log(element)
    //         if (element.name == "ROLE_ADMIN") role = "ROLE_ADMIN";
    //         else if (role != "ROLE_ADMIN" && element.name == "ROLE_MODERATOR") role = "ROLE_MODERATOR"
    //     });

    //     if (role) {
    //         return(
    //             <td className="finished">
    //                 <select>
    //                     <option disabled>User</option>
    //                     <option disabled>Moderator</option>
    //                     <option selected disabled>Admin</option>
    //                 </select>
    //             </td>
    //         )
    //     }
    //     else if (role) {
    //         return(
    //             <td className="finished">
    //                 <select>
    //                     <option>User</option>
    //                     <option selected>Moderator</option>
    //                     <option disabled>Admin</option>
    //                 </select>
    //             </td>
    //         )
    //     } else if (role) {
    //         return(
    //             <td className="finished">
    //                 <select>
    //                     <option selected>User</option>
    //                     <option>Moderator</option>
    //                     <option disabled>Admin</option>
    //                 </select>
    //             </td>
    //         )
    //     }
    // }

    render() {
        return(
        <table className="table">
            <thead >
                <tr>
                    <th scope="col"><a className="sort">#</a></th>
                    <th scope="col"><a className="sort">Username</a></th>
                    <th scope="col"><a className="sort">Email</a></th>
                    <th scope="col"><a className="sort">Active</a></th>
                    {/* <th scope="col"><a className="sort">Moderator</a></th> */}
                 </tr>
            </thead>
            <tbody>
                
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
        </table>)
    }
}