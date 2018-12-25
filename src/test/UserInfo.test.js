import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { UserInfo } from '../containers/UserInfo';
import Enzyme , { shallow } from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

const fakeUser = {
    login: "GithubUserName",
    avatar_url: "avatar_url",
    html_url: "html_url"
};

const fakeRepos = ["repo1", "repo2", "repo3"];

describe('Should correct render component and send props correctly', () => {
    const mockCallback = jest.fn(x => x);
    const userInfo = shallow(<UserInfo
                                    currentUser={fakeUser}
                                    userRepos={fakeRepos}
                                    repo={fakeRepos[0]}
                                    getRepoIssues={mockCallback}
                                />);

    test("Should find all user image , name, input with selects and link to user github profile", () => {
        expect(userInfo.exists("datalist")).toEqual(true);
        expect(userInfo.exists(".user_profile_input")).toEqual(true);
        expect(userInfo.find("option").length).toEqual(3);
        expect(userInfo.find("option").first().prop("value")).toEqual("repo1");
        expect(userInfo.find(".user_profile_input").prop("value")).toEqual("repo1");

        expect(userInfo.exists("img")).toEqual(true);
        expect(userInfo.find("img").prop('src')).toEqual("avatar_url");

        expect(userInfo.exists("h1")).toEqual(true);
        expect(userInfo.find("h1").text()).toEqual("GithubUserName");

        expect(userInfo.exists("a")).toEqual(true);
        expect(userInfo.find("a").prop("href")).toEqual("html_url");

    });

    test("Should send correct value to api when user click search button", () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        userInfo.find("form").simulate("submit", fakeEvent);

        // Should call submit function once, with correct argument
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.results[0].value).toBe(fakeUser.login);
    });

});