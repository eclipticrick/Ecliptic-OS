import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Temp, {IPropsTest} from './Temp';

configure({
    adapter: new Adapter()
});

describe('<Temp />', () => {
    let wrapper: any;

    beforeEach(() => {
        const props: IPropsTest = {
            filename: 'BOOTMGR'
        };
        wrapper = shallow(<Temp {...props} />);
    });

    it('should render only once', () => {
        expect(wrapper).toHaveLength(1);
    })
});
