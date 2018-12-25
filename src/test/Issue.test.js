import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import IssueComponent from '../components/Issue';
import Enzyme , { shallow } from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

test('Should correct render component and send props correctly', () => {
    const issue = shallow(<IssueComponent title="GITHUB" state={"open"} number={12}  />);
    expect(issue.find(".mainInfo h1").text()).toEqual('GITHUB');
    expect(issue.find(".mainInfo h2").text()).toEqual(' #12');
});