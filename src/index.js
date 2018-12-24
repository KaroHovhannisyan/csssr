import ReactDOM from 'react-dom';
import React from 'react';
import App from "./App";
import "../dist/main.css";

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

module.hot.accept();

