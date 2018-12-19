import * as React from 'react';
import Desktop from '../Desktop/Desktop';
import TaskBar from '../TaskBar/TaskBar';
import LoginScreen from '../LoginScreen/LoginScreen';
import {IStore} from '../../store/initialize';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import '../../transitions/zoom.scss';

export interface IOperatingSystemProps {
    isLoggedIn: boolean
}

export class OperatingSystem extends React.Component<IOperatingSystemProps, {}> {
    public render() {
        const { isLoggedIn } = this.props;
        // if (!isLoggedIn) {
        //     return <LoginScreen/>
        // }
        return (
            <>
                <CSSTransition in={isLoggedIn} timeout={240} classNames={'transition-zoom'}>
                    <>
                        <Desktop/>
                        <TaskBar/>
                    </>
                </CSSTransition>
                <CSSTransition in={!isLoggedIn} timeout={240} classNames={'transition-zoom'}>

                    <LoginScreen/>

                </CSSTransition>
            </>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    const { isLoggedIn } = state.user;
    return { isLoggedIn }
};

export default connect(mapStateToProps)(OperatingSystem);
