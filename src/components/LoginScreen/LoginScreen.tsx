import * as React from 'react';
import * as classes from './LoginScreen.module.scss';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {IStore} from '../../store/initialize';

export interface ILoginScreenPassedProps {
    login: () => void
    userName: string
    userImageSrc: string
}

export class LoginScreen extends React.Component<ILoginScreenPassedProps, {}> {

    public render() {
        const { props, props: { userName, userImageSrc } } = this;

        const handleKeyPress = (e: any) => {
            if (e.key === 'Enter') {
                props.login()
            }
        };

        return (
            <div className={classes.root}>

                <div className={classes.aroundContent}/>

                <div className={classes.content}>
                    <div>
                        <div className={classes.userImage}>
                            <img src={userImageSrc}/>
                        </div>
                        <div className={classes.userName}>
                            {userName}
                        </div>
                        <div className={classes.userPassword}>
                            <input id='password'
                                   type='password'
                                   placeholder='Enter Password'
                                   className={classes.password}
                                   onKeyPress={handleKeyPress}
                                   autoFocus
                                   autoComplete='off'/>
                        </div>
                    </div>
                </div>

                <div className={classes.aroundContent}>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    const { name, imageSrc } = state.user;
    return { userName: name, userImageSrc: imageSrc }
};
const mapDispatchToProps = (dispatch: any): Partial<ILoginScreenPassedProps> => ({
    login: () => dispatch(actions.login()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
