import React from "react";
import { connect } from "react-redux";
import {attemptGetIssuesForRepo, attemptGetUserRepos, selectRepo} from "../redux/actions";

class UserInfo extends React.Component{
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
       const { currentUser, userRepos, selectRepo, repo } = this.props;
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
                   <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
                       Select Repo
                       {userRepos && userRepos.length ? (<div>
                           <input list="repos" value={repo} onChange={({target}) => selectRepo(target.value)}/>
                           <datalist id="repos">
                               {userRepos.map(repo => <option  key={repo} value={repo} /> )}
                           </datalist>
                           <button type="submit">Search</button>
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
        userRepos: state.userRepos ? state.userRepos.map(e => e.name) : null,
        repo: state.repo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptGetUserRepos: (userName) => dispatch(attemptGetUserRepos(userName)),
        getRepoIssues: (userName, repo, loadData) => dispatch(attemptGetIssuesForRepo(userName, repo, loadData)),
        selectRepo: (repo) => dispatch(selectRepo(repo)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)
