import React from "react";
import {connect} from "react-redux";
import {attemptGetUserInfo} from "../redux/actions";

class CurrentUser extends React.Component{
    componentDidMount() {
        if(!this.props.currentUser){
            const userName= this.props.location.search;
            this.props.attemptGetUserInfo(userName.substr(1))
        }
    }

    render(){
        const { currentUser } = this.props;
        if(!currentUser){
            return null
        }

        return <div>
            <img src={currentUser.avatar_url} />
            <h1>{currentUser.login}</h1>
            <p>Info: {currentUser.info}</p>
            <p>BIO:  {currentUser.bio}</p>
            <p>BLOG:  {currentUser.blog}</p>
            <p>EMAIL:  {currentUser.email}</p>
            <p>CREATED:  {currentUser.created_at}</p>
            <p>UPDATED:  {currentUser.updated_at}</p>
            <p>FOLOWERS:  {currentUser.followers}</p>
            <p>FOLOWING:  {currentUser.following}</p>
            <p>URL:  {currentUser.html_url}</p>
            <p>NAME:  {currentUser.name}</p>
            <p>PUBLIC REPOS:  {currentUser.public_repos}</p>
        </div>
    }
}

const mapStateToProps = (state) => {
    if(!state){
        return {}
    }
    return {
        currentUser: state.currentUser
    }
};

function mapDispatchToProps(dispatch) {
    return {
        attemptGetUserInfo: (userName) => dispatch(attemptGetUserInfo(userName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser)