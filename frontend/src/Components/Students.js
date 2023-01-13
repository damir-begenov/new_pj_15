import { Component, useEffect } from "react";
// import {StudentsList} from "../Students";
import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
 

class AllStudents extends Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8012/alls`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
      }
      status(e) {
        if (e.end_date == '' ) {
            return <td className="finished">Studying</td>
        } else {
            return <td className="unfinished">Graduated</td>
        }
    }
    render() {
        return (
        <table className="table marginTop">
            <thead className="marginTop">
                <tr>
                <th scope="col"><a class="sort">#</a></th>
                <th scope="col"><a class="sort">IIN</a></th>
                <th scope="col"><a class="sort">FIO</a></th>
                <th scope="col"><a class="sort">LABEL</a></th>
                <th scope="col"><a class="sort">Status</a></th>
                <th scope="col"><a class="sort">School</a></th>
                <th scope="col"></th>
                 </tr>
            </thead>
            <tbody>
            {this.state.persons.map((person, index) => 
                <tr className="row">
                <th scope="row">{index+1}</th>
                <td className="IIN"><Link className="rowInfo" to={`/students/${person.iinid}`}>{person.iinid}</Link></td>
                <td className="FIO"><Link className="rowInfo" to={`/students/${person.iinid}`}>{person.fio}</Link></td>
                <td>{person.label}</td>
                {this.status(person.rel_finals[0])}
                <td><Link className="rowInfo" to={`/schools/${person.rel_finals[0].node_c.binid}`}>{person.rel_finals[0].node_c.company}</Link></td>
            </tr>
            )}
            </tbody>
        </table>
        )
    }
}

export default AllStudents