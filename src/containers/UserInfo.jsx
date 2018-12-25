import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {attemptGetIssuesForRepo, attemptGetUserRepos, selectRepo} from "../redux/actions";

export class UserInfo extends React.Component{
    constructor(props){
        super(props);
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

    handleSubmit(e) {
        e.preventDefault();
        const { currentUser, getRepoIssues, repo } = this.props;
        getRepoIssues(currentUser.login, repo, {page: 1, per_page: 5});
    }

    render(){
       const { currentUser, userRepos, selectRepo, repo, error } = this.props;

       if(error){
           return  <div className={"user_profile"}>
               <h1>User doesn`t exist!!!</h1>
           </div>
       }

       if(!currentUser){
           return null;
       }

        return (
           <div>
               <div className={"user_profile"}>
                   <img src={currentUser.avatar_url} />
                   <div className="userInfo">
                       <h1>{currentUser.login}</h1>
                       <span>{currentUser.bio}</span>
                       <p>{currentUser.created_at}</p>
                       <a href={currentUser.html_url} target={"_blank"}>Go to Profile</a>
                   </div>
                   <form className="user_info_form" method="post" onSubmit={(e) => this.handleSubmit(e)}>
                       {userRepos && userRepos.length ? (<div>
                           <input placeholder="Select Repo" className="user_profile_input" list="repos" value={repo} onChange={({target}) => selectRepo(target.value)}/>
                           <datalist id="repos">
                               {userRepos.map(repo => <option  key={repo} value={repo} /> )}
                           </datalist>
                           <button className="user_profile_button"  type="submit">See issues</button>
                       </div>) : <p>User have not any repositories(</p> }
                   </form>
                   <button className="button3"
                           onClick={()=>this.props.history.push(`/users?${currentUser.login}`)}
                   >
                       More info
                   </button>
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
        userRepos: state.userRepos ? state.userRepos.map(e => e.name) : null,
        repo: state.repo,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptGetUserRepos: (userName) => dispatch(attemptGetUserRepos(userName)),
        getRepoIssues: (userName, repo, loadData) => dispatch(attemptGetIssuesForRepo(userName, repo, loadData)),
        selectRepo: (repo) => dispatch(selectRepo(repo)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserInfo))
