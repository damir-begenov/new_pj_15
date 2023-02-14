import { Component } from "react";
import { Link, useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from 'axios';

function withParams(Component) {
    return props => <Component {...props} username={useParams()} />;
}

class UserDetails extends Component {
    state = {
        user: {},
        stat: {}
    }
    
    componentDidMount() {
        axios.get(`http://localhost:9091/api/finpol/main/statistic`, {params: {username: this.props.username.username}})
          .then(res => {
            const user = res.data;
            this.setState({user: user.user, stat: user})
        })
    }


    render() {
        return(
            <div>{this.state.user.username}</div>
        )
    }
}

export default withParams(UserDetails);
