import * as React from 'react';
import * as classes from './LoginScreen.module.scss';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import * as userImageSrc from '../../assets/images/admin.jpg';

export interface ILoginScreenProps {
    login: () => void
}

export class LoginScreen extends React.Component<ILoginScreenProps, {}> {

    public render() {
        const { props } = this;

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
                            Admin
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

const mapDispatchToProps = (dispatch: any): Partial<ILoginScreenProps> => ({
    login: () => dispatch(actions.login()),
});
export default connect(null, mapDispatchToProps)(LoginScreen);
