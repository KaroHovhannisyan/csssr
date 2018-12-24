import {
    GET_ISSUES_FOR_REPO_SUCCESS,
    GET_USER_INFO_FAILED,
    GET_USER_INFO_SUCCESS,
    GET_USER_REPOS_SUCCESS,
    SELECT_REPO
} from "../actions";

const initialState = {
    currentUser: null,
    userRepos: null,
    issues: null,
    repo: '',
    issuesCount: null
}

export default (state = initialState, action) => {
    const {type, payload } = action;

    switch (type) {
        case GET_USER_INFO_SUCCESS :
            return {
                ...state,
                currentUser: payload.user,
                repo: '',
                issuesCount : null
            };

        case GET_USER_INFO_FAILED :
            return {
                ...state,
                currentUser: null,
                error: payload.error.message
            };

        case GET_USER_REPOS_SUCCESS :
            return {
                ...state,
                userRepos: payload.repos,
            };

        case GET_ISSUES_FOR_REPO_SUCCESS :
            if (payload.loadData.page === 1) {
                let currentRepo = state.userRepos.find(item => item.name === payload.repo);
                console.log(state.userRepos, payload.repo, "currentRepo");
                return {
                    ...state,
                    issuesCount: currentRepo.open_issues_count,
                    issues: payload.issues,
                };
            }
            return {
                ...state,
                issues: payload.issues,
            };
        case SELECT_REPO :
            return {
                ...state,
                repo: payload.repo,
            };
    }
}
