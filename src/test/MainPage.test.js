import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from '../components/MainPage';
import Search from '../containers/Search';
import UserInfo from '../containers/UserInfo';
import IssuesList from '../containers/IssuesList';
import Enzyme , { shallow } from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

test('Should correct render component find Components', () => {
    const mainPage = shallow(<MainPage />);
    expect(mainPage.find(Search).exists()).toEqual(true);
    expect(mainPage.find(UserInfo).exists()).toEqual(true);
    expect(mainPage.find(IssuesList).exists()).toEqual(true);
});