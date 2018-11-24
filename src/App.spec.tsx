import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({
    adapter: new Adapter()
});

describe('<App />', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('should render only once', () => {
        expect(wrapper).toHaveLength(1);
    })
});
