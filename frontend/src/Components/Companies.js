import { Component } from "react";
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';

class Companies extends Component {
    state = {
        schools: [],
        // links: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8012/alls/school`)
          .then(res => {
            const schools = res.data;
            // const links = this.getLinks(schools)
            this.setState({ schools });
          })
      }

    render() {
        return(
        <table className="table">
            <thead >
                <tr>
                <th scope="col"><a className="sort">#</a></th>
                <th scope="col"><a className="sort">BIN</a></th>
                <th scope="col"><a className="sort">Company</a></th>
                <th scope="col"><a className="sort">LABEL</a></th>
                <th scope="col"></th>
                 </tr>
            </thead>
            <tbody>
                
                {this.state.schools.map((person, index) => 
            <tr className="row">
                <th scope="row">{index+1}</th>
                <td>{person.binid}</td>
                <td className="FIO"><Link className="rowInfo" to={`/schools/${person.binid}`}>{person.company}</Link></td>
                <td>{person.label}</td>
            </tr>
            
            )}
            </tbody>
        </table>)
    }
}

export default Companies