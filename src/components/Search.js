import React from "react";
import githubApi from "../api/githubApi";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: ""
        }
    }

    searchByUserName(){;
        var api = new githubApi()
        api.getUserInfo(this.state.userName)
    }

    render(){
       const { userName } = this.state;
       return (
           <div>
                   <input type={"text"}
                          value={userName}
                          onChange={({target}) => this.setState({userName: target.value})}
                   />
                   <button onClick={() => this.searchByUserName()}>Поиск</button>
           </div>
       )
   }
}
