import React from "react";

const Issue = (props) => (<div className='issue'>
    <div className="mainInfo">
        <h1>{props.title}</h1>
        <h2>{` #${props.number}`}</h2>
    </div>
    <div className={"owner"}>
        <div className="State State--green">
            <svg className="octicon octicon-issue-opened" viewBox="0 0 14 16" version="1.1" width="14" height="16"
                 aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
            </svg>
            {props.state.toUpperCase()}
        </div>
        <symbol>Created by :<span>{props.user.login}</span></symbol>
        <span>Opened In : {props.created_at}</span>
    </div>
    <div>
        <p>{props.body}</p>
    </div>
</div>)

export default Issue;
