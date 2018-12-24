import React from "react";
import { connect } from "react-redux";
import {attemptGetUserRepos} from "../redux/actions";

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            repo: ""
        }
    }

    componentDidUpdate(prevProps){
        const { currentUser, userRepos, attemptGetUserRepos } = this.props;
        if(currentUser){
            if(prevProps.currentUser && (prevProps.currentUser.login !== currentUser.login)){
                attemptGetUserRepos(currentUser.login)
            }

            if(!userRepos){
                attemptGetUserRepos(currentUser.login)
            }
        }
    }

    render(){
       const { currentUser, userRepos, getRepoIssues } = this.props;
       const { repo } = this.state;
       if(!currentUser){
           return null;
       }
       return (
           <div>
               <div className={"user_profile"}>
                   <img src={currentUser.avatar_url} />
                   <div>
                       <h1>{currentUser.login}</h1>
                       <span>{currentUser.bio}</span>
                       <p>{currentUser.created_at}</p>
                       <a href={currentUser.html_url} target={"_blank"}>Go to Profile</a>
                   </div>
                   <form method="get">
                       Select Repo
                       {userRepos && userRepos.length ? (<div>
                           <input list="repos" name="browser"  value={repo} onChange={({target}) => this.setState({repo: target.value})}/>
                           <datalist id="repos">
                               {userRepos.map(repo => <option  key={repo} value={repo} /> )}
                           </datalist>
                           <button onClick={() => getRepoIssues(currentUser.login, repo)}>Search</button>
                       </div>) : <p>User have not any repositories(</p> }
                   </form>

               </div>


           </div>
       )
   }
}

const mapStateToProps = (state) => {
    if(!state){
        return {}
    }
    return {
        currentUser: state.currentUser,
        userRepos: state.userRepos ? state.userRepos.map(e => e.name) : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptGetUserRepos: (userName) => dispatch(attemptGetUserRepos(userName)),
        getRepoIssues: (userName, repo) => null
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)
