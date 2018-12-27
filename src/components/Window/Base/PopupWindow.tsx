import * as React from 'react';
import * as classes from './Window.module.scss';
import Draggable, {DraggableData} from 'react-draggable';
import {Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {IPopupInstance, PopupType} from '../../../appdata/window';
import classNames from 'classnames';

import * as errorIcon from '../../../assets/images/icons/070-cancel.svg';
import * as infoIcon from '../../../assets/images/icons/068-info.svg';
import * as warningIcon from '../../../assets/images/icons/069-warning.svg';
import * as helpIcon from '../../../assets/images/icons/071-question.svg';
import {disableDragging, enableDragging, handleDraggingStop} from './sharedFunctions';

const iconSrc = {
    [PopupType.INFO]: infoIcon,
    [PopupType.HELP]: helpIcon,
    [PopupType.WARNING]: warningIcon,
    [PopupType.ERROR]: errorIcon,
};

export interface IPopUpProps {
    popup: IPopupInstance
    children: any // TODO inherit from React.Props?
}
interface IPopupPassedProps {
    closePopup: () => void
}
interface IPopupState {
    disableDragging: boolean
    position: {
        x: number
        y: number
    }
}
class PopupWindow extends React.Component<IPopUpProps & IPopupPassedProps, IPopupState> {
    public state = {
        disableDragging: false,
        position: {
            x: 0,
            y: 0
        }
    };

    public render() {
        const {
            props,
            props: {
                popup,
                children
            }
        } = this;

        const handleDraggingStart = (): false | void => {
            if (this.state.disableDragging) {
                return false
            }
        };

        return (
            <Draggable defaultClassName={classNames(classes.root, classes.selected)}
                       handle={`.${classes.titleBar}`}
                       bounds='parent'
                       position={ this.state.position }
                       onStart={handleDraggingStart}
                       onStop={(e: MouseEvent, data: DraggableData) => handleDraggingStop(e, data, this)}>

                <div>
                    <div className={classes.titleBar}
                         onMouseEnter={() => enableDragging(this)}>

                        <div className={classes.left}>
                            <img src={iconSrc[popup.type]} />
                            <span className={classes.title}>{popup.title}</span>
                        </div>
                        <div className={classes.right}>
                            <button type='button'
                                    onMouseUp={() => props.closePopup()}
                                    className={classes.close}
                                    onMouseEnter={() => disableDragging(this)}
                                    onMouseLeave={() => enableDragging(this)}>
                                <Icon className={classes.icon}>close</Icon>
                            </button>
                        </div>

                    </div>

                    <div className={classNames(classes.content, classes.popupContent)}>
                        {children}
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapDispatchToProps = (dispatch: any): Partial<IPopupPassedProps> => ({
    closePopup: () => dispatch(actions.closePopup())
});
export default connect<Partial<IPopupPassedProps>, Partial<IPopupPassedProps>, IPopUpProps>(
    null, mapDispatchToProps
)(PopupWindow);
