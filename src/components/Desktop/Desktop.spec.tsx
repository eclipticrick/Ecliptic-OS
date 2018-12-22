import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Desktop, IDesktopProps} from './Desktop';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';

configure({
    adapter: new Adapter()
});

describe('<Desktop />', () => {
    let wrapper: any;

    beforeEach(() => {
        const props: IDesktopProps = {
            taskbarHeight: 25,
            windows: [],
            shortcuts: [],
            openWindow: () => { return }
        };
        wrapper = shallow(<Desktop {...props} />);
    });

    it('should render only once', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a background component', () => {
        expect(wrapper.find(Background)).toHaveLength(1);
    });
    it('should have a iconGrid component', () => {
        expect(wrapper.find(IconGrid)).toHaveLength(1);
    })
});
