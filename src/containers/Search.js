import React from "react";
import githubApi from "../api/githubApi";
import { connect } from "react-redux";
import { attemptGetUserInfo } from "../redux/actions";

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: ""
        }
    }

    render(){
       const { userName } = this.state;
       const { attemptGetUserInfo } = this.props;
       return (
           <div>
               <form>
                   <div className="inner-form">
                       <div className="input-field first-wrap">
                           <input type={"text"}
                                  id="search"
                                  placeholder="Search Github username"
                                  value={userName}
                                  onChange={({target}) => this.setState({userName: target.value})}
                           />
                       </div>
                       <div className="input-field third-wrap">
                           <button className="btn-search" type="button" onClick={() => attemptGetUserInfo(userName)}>Поиск</button>
                       </div>
                   </div>
               </form>

           </div>
       )
   }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        attemptGetUserInfo: (userName) => dispatch(attemptGetUserInfo(userName))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)
