import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Search } from '../containers/Search';
import Enzyme , { shallow } from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

describe('Should correct render component and send props correctly', () => {
    const mockCallback = jest.fn(x => x);
    const search = shallow(<Search attemptGetUserInfo={mockCallback} />);

    test("Should find search input and search button", () => {
        expect(search.exists("#search")).toEqual(true);
        expect(search.exists(".btn-search")).toEqual(true);
    });

    test("Should send correct value to api when user click search button", () => {

        const fakeEvent = { preventDefault: () => console.log('preventDefault') };

        search.find("#search").simulate("change", {target: {value: "Github"}});
        expect(search.state("userName")).toEqual("Github");
        search.find("form").simulate("submit", fakeEvent);

        // Should call submit function once, with correct argument
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.results[0].value).toBe("Github");

    });

});