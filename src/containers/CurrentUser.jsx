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

        return <div className="card">
            <img src={currentUser.avatar_url} />
            <h1 className="title">{currentUser.login}</h1>
            {
                (currentUser.info && <p><span>Info:</span> {currentUser.info}</p>)
            }
            {
                (currentUser.bio && <p><span>BIO:</span> {currentUser.bio}</p>)
            }
            {
                (currentUser.blog && <p><span>BLOG:</span> {currentUser.blog}</p>)
            }
            {
                (currentUser.email && <p><span>EMAIL:</span> {currentUser.email}</p>)
            }
            {
                (currentUser.created_at && <p><span>CREATED:</span> {currentUser.created_at}</p>)
            }
            {
                (currentUser.updated_at && <p><span>UPDATED:</span> {currentUser.updated_at}</p>)
            }
            {
                (currentUser.followers !== 0 && <p><span>FOLOWERS:</span> {currentUser.followers}</p>)
            }
            {
                (currentUser.following !==0 && <p><span>FOLOWING:</span> {currentUser.following}</p>)
            }
            {
                (currentUser.html_url && <p><span>URL:</span> <a href={currentUser.html_url} target="_blank">{currentUser.html_url}</a></p>)
            }
            {
                (currentUser.name && <p><span>NAME:</span> {currentUser.name}</p>)
            }
            {
                (currentUser.public_repos !==0 && <p><span>PUBLIC REPOS:</span> {currentUser.public_repos}</p>)
            }
            <button onClick={()=> this.props.history.push('/')}>Main page</button>
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