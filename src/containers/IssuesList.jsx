import React from "react";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import {attemptGetIssuesForRepo} from "../redux/actions";
import Issue from "../components/Issue";

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

        if(issuesCount === 0){
            return (<div className="alert">
                User repo haven`t issues
            </div>)
        }

        if(!currentUser || !issuesCount){
            return null;
        }
        let pageCount = Math.ceil(issuesCount / this.state.loadData.per_page);

        return (
            <div>
                    {issues.map((item, i) => {
                        return (
                            <Issue key={i} {...item} />
                        );
                    })}
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
