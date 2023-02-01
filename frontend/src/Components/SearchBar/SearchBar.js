import React,{ Component } from "react";
import axios from 'axios';
import AllStudents from "./Students";
import { Link } from 'react-router-dom'


export default class SearchBar extends Component {
    componentDidMount() {
        axios.get(`http://127.0.0.1:8012/alls`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
          
    }
    state = {
        persons: [],
        loading: false,
        value: ''
    }
    search = async val => {
        let link = 'http://127.0.0.1:8012/alls/' + val
        axios 
            .get(link)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
              })
    }; 

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };


    
//       get renderMovies() {
//         let movies = <h1>There's no movies</h1>;
//         if (this.state.persons) {
//             console.log(this.state.persons)
//             AllStudents.setState({persons: this.state.persons})
//           movies = <AllStudents setState={this.state.persons} />;
//     }
// return movies}
status(e) {
    if (e.end_date == '' ) {
        return <td className="finished">Studying</td>
    } else {
        return <td className="unfinished">Graduated</td>
    }
}
    get kuni() {
        if (this.state.persons.length==0) {
            return <h1 className="resultOfSearch">No one is here</h1>
        } else {
            return (
                <table class="table">
            <thead >
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

    render() {
        return (

            <>

            <div className="wrap">
                <div className="search">
                    <input value={this.state.value}
          onChange={e => this.onChangeHandler(e)} type="text" className="searchTerm" placeholder="What are you looking for?"></input>
                    {/* <button type="submit" class="searchButton">
                    Search
                    </button> */}
                </div>
            </div>
            {this.kuni}
            </>
            

        )
    }
}