import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch,Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";

import githubApiMiddleWare from "./redux/middleWare";
import mainReducer from "./redux/reducers"
import fetchInterceptor from "./api/fetchInterceptor";

import CurrentUser from "./containers/CurrentUser";
import MainPage from "./components/MainPage";

/**
 * fetch interceptor is middleware for fetch request/response
 */
fetchInterceptor();

const store = createStore(mainReducer, applyMiddleware(githubApiMiddleWare));

function handleChange() {
    console.log(store.getState())
}

store.subscribe(handleChange);

export default class App extends Component {
    render(){
        return <Provider store={store}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={MainPage} />
                        <Route  path={"/users"} component={CurrentUser}/>
                        <Route  path={"*"} component={()=> <h1>Not Found</h1>}/>
                    </Switch>
            </BrowserRouter>
        </Provider>
    }
}
