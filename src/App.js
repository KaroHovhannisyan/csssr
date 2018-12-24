import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import githubApiMiddleWare from "./redux/middleWare";
import mainReducer from "./redux/reducers"
import fetchInterceptor from "./api/fetchInterceptor";

import Search from "./containers/Search";
import UserInfo from "./containers/UserInfo";

/**
 * fetch interceptor is middleware for fetch request/response
 */
fetchInterceptor();

const store = createStore(mainReducer, applyMiddleware(githubApiMiddleWare));

export default class App extends Component {
    render(){
        return (
            <Provider store={store}>
               <Search/>
                <UserInfo/>
            </Provider>
        )
    }
}
