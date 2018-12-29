import * as React from 'react';
import Desktop from '../Desktop/Desktop';
import StartMenu from '../StartMenu/StartMenu';
import TaskBar from '../TaskBar/TaskBar';
import LoginScreen from '../LoginScreen/LoginScreen';
import {IStore} from '../../store/initialize';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import '../../transitions/zoom.scss';

export interface IOperatingSystemProps {
    isLoggedIn: boolean
    startMenuOpened: boolean
}

export class OperatingSystem extends React.Component<IOperatingSystemProps, {}> {
    public render() {
        const { isLoggedIn, startMenuOpened } = this.props;
        return (
            <>
                <CSSTransition in={isLoggedIn} timeout={240} classNames={'transition-zoom'}>
                    <>
                        <Desktop/>
                        { startMenuOpened ? <StartMenu/> : null }
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
    const { opened } = state.startmenu;
    return { isLoggedIn, startMenuOpened: opened }
};

export default connect(mapStateToProps)(OperatingSystem);
