import githubApi from "../api/githubApi";
import {
    ATTEMPT_GET_USER_INFO,
    ATTEMPT_GET_USER_REPOS,
    attemptGetUserRepos,
    getUserInfoFailed,
    getUserInfoSuccess, getUserReposFailed, getUserReposSuccess
} from "./actions";

const API = new githubApi();

const  githubApiMiddleWare = store => next => action => {
    const {type, payload} = action;
    switch (type) {
        case ATTEMPT_GET_USER_INFO : {
            API.getUserInfo(payload.username)
                .then(res => {
                    if(!res.message){
                        next(getUserInfoSuccess(res))
                    } else {
                        next(getUserInfoFailed(res))
                    }
                })
                .catch(error => next(getUserInfoFailed(error)));
            break;
        }

        case ATTEMPT_GET_USER_REPOS : {
            API.getUserRepos(payload.username)
                .then(res => {
                    if(!res.message){
                        next(getUserReposSuccess(res))
                    } else {
                        next(getUserReposFailed(res))
                    }
                })
                .catch(error => next(getUserReposFailed(error)));
            break;
        }
    }
}

export default githubApiMiddleWare
