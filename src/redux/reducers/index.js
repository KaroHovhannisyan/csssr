import {GET_USER_INFO_FAILED, GET_USER_INFO_SUCCESS, GET_USER_REPOS_SUCCESS} from "../actions";

const initialState = {
    currentUser: null,
    userRepos: null
}

export default (state = initialState, action) => {
    const {type, payload } = action;
    console.log(payload)
    switch (type) {
        case GET_USER_INFO_SUCCESS :
            return {
                ...state,
                currentUser: payload.user
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
    }
}
