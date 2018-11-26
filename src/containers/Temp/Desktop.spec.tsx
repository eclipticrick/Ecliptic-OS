import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Desktop} from './Desktop';
import DesktopBackground from '../../components/Desktop/DesktopBackground';
import DesktopIconGrid from '../../components/Desktop/DesktopIconGrid';

configure({
    adapter: new Adapter()
});

describe('<Desktop />', () => {
    let wrapper: any;

    beforeEach(() => {
        const props = {};
        wrapper = shallow(<Desktop {...props} />);
    });

    it('should render only once', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a background component', () => {
        expect(wrapper.find(DesktopBackground)).toHaveLength(1);
    });
    it('should have a iconGrid component', () => {
        expect(wrapper.find(DesktopIconGrid)).toHaveLength(1);
    })
});
