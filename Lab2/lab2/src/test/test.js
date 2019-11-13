import React from 'react';
import renderer from 'react-test-renderer';
import FavouriteCityComponent from "../components/FavouriteCityComponent";
import fetch from 'node-fetch'
import jest from 'jest-mock';
import {shallow, render, mount} from 'enzyme';
import FavouriteCitiesComponent from "../components/FavouriteCitiesComponent";
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import {shallowToJson} from "enzyme-to-json";
import MainComponent from "../components/MainComponent";

configure({adapter: new Adapter()});


test('Test loading render for FavouriteCities', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockStore = configureMockStore();
    const store = mockStore({cities:[]});
    const wrapper = shallow(
        <FavouriteCityComponent store={store} name='Moscow'/>).dive();
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('Test loaded city render for FavouriteCities', () => {
    const mockSuccessResponse = {
        "coord": {
            "lon": -0.13,
            "lat": 51.51
        },
        "weather": [
            {
                "id": 300,
                "main": "Drizzle",
                "description": "light intensity drizzle",
                "icon": "09d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 280.32,
            "pressure": 1012,
            "humidity": 81,
            "temp_min": 279.15,
            "temp_max": 281.15
        },
        "visibility": 10000,
        "wind": {
            "speed": 4.1,
            "deg": 80
        },
        "clouds": {
            "all": 90
        },
        "dt": 1485789600,
        "sys": {
            "type": 1,
            "id": 5091,
            "message": 0.0103,
            "country": "GB",
            "sunrise": 1485762037,
            "sunset": 1485794875
        },
        "id": 2643743,
        "name": "London",
        "cod": 200
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    global.fetch = require("node-fetch");
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const mockStore = configureMockStore();
    const store = mockStore({cities:[]});
    const wrapper = shallow(
        <FavouriteCityComponent store={store} name='Moscow'/>).dive();
    wrapper.render();
    wrapper.componentDidMount()
    wrapper.instance().componentDidMount().then(()=>{
        wrapper.render();
        expect(shallowToJson(wrapper)).toMatchSnapshot()});

});



test('Test entering text in FavouriteCitiesComponent', () => {
    const mockStore = configureMockStore();
    const store = mockStore({cities:[]});
    const wrapper = shallow(
            <FavouriteCitiesComponent store={store}> </FavouriteCitiesComponent>).dive();
    wrapper.render();
    const temp = wrapper.find('FavouriteCitiesComponent').dive();
    temp.render();
    const input = temp.find('input');
    input.simulate('change', { target: { value: 'Hello' } })
    expect(shallowToJson(temp)).toMatchSnapshot();
});

test('Main weather component', () =>{
    const wrapper = shallow(<MainComponent></MainComponent>);
    wrapper.render();

});
