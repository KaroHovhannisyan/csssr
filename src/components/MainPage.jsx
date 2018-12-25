import React from "react";
import Search from "../containers/Search";
import UserInfo from "../containers/UserInfo";
import IssuesList from "../containers/IssuesList";

const MainPage = () => (<div className={"s01"}>
    <Search/>
    <UserInfo/>
    <IssuesList/>
</div>);

export default MainPage;