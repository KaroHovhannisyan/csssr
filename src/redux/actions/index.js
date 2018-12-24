/**
 * Get information about user
 * @type {string}
 */
export const ATTEMPT_GET_USER_INFO = "ATTEMPT_GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const attemptGetUserInfo = (username) => ({type: ATTEMPT_GET_USER_INFO, payload: {username}});
export const getUserInfoSuccess = (user) => ({type: GET_USER_INFO_SUCCESS, payload: {user}});
export const getUserInfoFailed = (error) => ({type: GET_USER_INFO_FAILED, payload: {error}});

/**
 * Get user Repositories
 * @type {string}
 */
export const ATTEMPT_GET_USER_REPOS = "ATTEMPT_GET_USER_REPOS";
export const GET_USER_REPOS_SUCCESS = "GET_USER_REPOS_SUCCESS";
export const GET_USER_REPOS_FAILED = "GET_USER_REPOS_FAILED";
export const attemptGetUserRepos = (username) => ({type: ATTEMPT_GET_USER_REPOS, payload: {username}});
export const getUserReposSuccess = (repos) => ({type: GET_USER_REPOS_SUCCESS, payload: {repos}});
export const getUserReposFailed = (error) => ({type: GET_USER_REPOS_FAILED, payload: {error}});

