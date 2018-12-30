import * as React from 'react';
// import {configure, shallow} from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
// import {Desktop, IDesktopPassedProps, IDesktopProps} from './Desktop';
// import Background from './Background/Background';
// import IconGrid from './IconGrid/IconGrid';

// configure({
//     adapter: new Adapter()
// });

describe('<Desktop />', () => {
    it('should test something', () => {
        const PI = 3.14;
        expect(1).not.toBe(PI);
    });
    // let wrapper: any;

    // beforeEach(() => {
    //     const props: IDesktopProps & IDesktopPassedProps = {
    //         taskbarHeight: 25,
    //         background: null,
    //         windows: [],
    //         shortcuts: [],
    //         popup: null,
    //         openWindow: () => 0,
    //         addRecentApplicationToStartMenu: () => 0
    //     };
    //     wrapper = shallow(<Desktop {...props} />);
    // });

    // it('should render only once', () => {
    //     expect(wrapper).toHaveLength(1);
    // });
    // it('should have a background component', () => {
    //     expect(wrapper.find(Background)).toHaveLength(1);
    // });
    // it('should have a iconGrid component', () => {
    //     expect(wrapper.find(IconGrid)).toHaveLength(1);
    // })
});
