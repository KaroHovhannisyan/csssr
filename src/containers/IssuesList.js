import React from "react";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import {attemptGetIssuesForRepo} from "../redux/actions";

class IssuesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageCount: 5,
            loadData: {
                per_page: 5,
                page: 1
            }
        }
    }

    handlePageClick({selected}) {
        const { currentUser, getRepoIssues, repo } = this.props;
        this.setState({loadData: {...this.state.loadData, page: selected + 1}}, () => {
            getRepoIssues(currentUser.login, repo, this.state.loadData);
        })

    };

    render(){
        const { issues, currentUser, issuesCount } = this.props;
        if(!currentUser || !issuesCount){
            return null;
        }
        let pageCount = Math.ceil(issuesCount / this.state.loadData.per_page);

        return (
            <div>
                <ul>
                    {issues.map((item, i) => {
                        return (
                            <li key={i}>{item.title}</li>
                        );
                    })}
                </ul>
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={"..."}
                               breakClassName={"break-me"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={(data) => this.handlePageClick(data)}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
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
        issues: state.issues,
        repo: state.repo,
        issuesCount: state.issuesCount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepoIssues: (userName, repo, loadData) => dispatch(attemptGetIssuesForRepo(userName, repo, loadData))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(IssuesList)
