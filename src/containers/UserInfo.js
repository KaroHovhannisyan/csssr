import React from "react";
import { connect } from "react-redux";
import {attemptGetUserRepos} from "../redux/actions";

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: ""
        }
    }

    componentDidUpdate(){
        const { currentUser, userRepos, attemptGetUserRepos } = this.props;
        if(currentUser && !userRepos){
            alert("ss")
            attemptGetUserRepos(currentUser.login)
        }
    }

    render(){
       const { currentUser, userRepos } = this.props;
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
                       <input list="repos" name="browser" />
                           <datalist id="repos">
                               {userRepos && userRepos.map(repo => <option  key={repo} value={repo} /> )}
                           </datalist>
                           <input type="submit" />
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
        attemptGetUserRepos: (userName) => dispatch(attemptGetUserRepos(userName))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)
