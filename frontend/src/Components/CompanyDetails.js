import { Component } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} id={useParams()} />;
}

class CompanyDetails extends Component {
    state= {
        school: {}
    }
    aa = {}
    list = []
    componentDidsMount() {
        this.setState({bin: this.props.id})
        this.componentDidMount()
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8012/alls/school/" + this.props.id.biniid)
          .then(res => {
            const school = JSON.parse(JSON.stringify(res.data));
            this.aa = JSON.parse(JSON.stringify(res.data));
            var hui = JSON.stringify(this.aa.n_sts);
            this.list = JSON.parse(hui)
            // const n_sts = JSON.parse(school.n_sts)
            // const n_sts = res.data.n_sts
            this.setState({school});
        console.log(this.aa.n_sts[0].rel_finals[0].end_date)
        console.log(this.list)
            this.lol()
          })
      }

    lol() {

        return <h1>this.aa.n_sts[0].rel_finals[0].end_date</h1>
    }
    status(e) {
        if (e.end_date == '' ) {
            return <td className="finished">Studying</td>
        } else {
            return <td className="unfinished">Graduated</td>
        }
    }
    render() {
        return(
            <div className="CompDetails">
                <div className="Naming">
                    {this.list.filter((item, index) => index==0).map(item => 
                    <>
                        <div className="school">
                            <div className="title">
                                <h1>{item.rel_finals[0].node_c.company.toUpperCase()}<span>:{item.rel_finals[0].node_c.label}</span></h1>
                                <h2 className="CompBin">БИН: {item.rel_finals[0].node_c.binid} </h2>
                            </div>
                            <div className="statCard container">
                                <h1 className="statTitle">Statistics</h1>
                                <ul className="statList">
                                    <li>Total students <span>{this.aa.finished + this.aa.unfinished}</span></li>
                                    <li>Graduated students <span>{this.aa.finished}</span></li>
                                    <li>Average GPA<span>{3.65}</span></li>
                                </ul>
                            </div>
    
                        </div>
                    </>
                    )}
                    <div className="studList">
                        <h1 className="studTitle">Students</h1>
                        <table >
                            <thead >
                                <tr>
                                    <th scope="col"><a class="sort">#</a></th>
                                    <th scope="col"><a class="sort">IIN</a></th>
                                    <th scope="col"><a class="sort">FIO</a></th>
                                    <th scope="col"><a class="sort">LABEL</a></th>
                                    <th scope="col"><a class="sort">Status</a></th>
                                    <th scope="col"><a class="sort">GPA</a></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.list.map((item, index) => 
                                    <tr className="row tdrow">
                                        <td scope="row">{index+1}</td>
                                        <td className="IIN">{item.iinid}</td>
                                        <td className="FIO">{item.fio}</td>
                                        <td>{item.label}</td>
                                        {this.status(item.rel_finals[0])}
                                        <td>3</td>
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

// function getSchool() {
//     let {biniid} = useParams();

// }

export default withParams(CompanyDetails)