import urls from "../configs/urls";

export default class githubApi {
    constructor() {
        this.env = "development";
    }

    getUserInfo(username){
        return fetch(`${urls[this.env].apiUrl}/users/${username}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    getUserRepos(username){
        return fetch(`${urls[this.env].apiUrl}/users/${username}/repos`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    getRepoIssues(username, repo){
        return fetch(`${urls[this.env].apiUrl}/repos/${username}/${repo}/issues`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}
