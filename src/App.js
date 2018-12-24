import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import githubApiMiddleWare from "./redux/middleWare";
import mainReducer from "./redux/reducers"
import fetchInterceptor from "./api/fetchInterceptor";

import Search from "./containers/Search";
import UserInfo from "./containers/UserInfo";
import IssuesList from "./containers/IssuesList";

/**
 * fetch interceptor is middleware for fetch request/response
 */
fetchInterceptor();

const store = createStore(mainReducer, applyMiddleware(githubApiMiddleWare));

function handleChange() {
    console.log(store.getState())
}

store.subscribe(handleChange)

export default class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <div className={"s01"}>
                    <Search/>
                    <UserInfo/>
                    <IssuesList/>
                </div>
            </Provider>
        )
    }
}
