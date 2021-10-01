import 'jsdom-global/register';
import React from 'react'
import { shallow, mount } from 'enzyme'

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });


import Card from '../src/components/card'

it("renders without crashing", () => {
    shallow(<Card />);
  });

it("has img tag", () => {
    const component = shallow(<Card />);
    const img = <img/>
    expect(component.contains(img)).toBe(true)
  });

const card = {suite: "Clubs", symbol: "K"}

it("card component mounts", () => {
    mount(<Card />)
})