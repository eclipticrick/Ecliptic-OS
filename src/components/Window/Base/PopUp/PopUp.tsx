import * as React from 'react';
import * as classes from '../Window.module.scss';
import Draggable, {DraggableData} from 'react-draggable';
import {Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {IPopUpInstance} from '../../../../appdata/window';
import classNames from 'classNames';

import * as errorIcon from '../../../../assets/images/icons/035-error.svg';

export interface IPopUpProps {
    popup: IPopUpInstance
}
interface IPopupPassedProps {
    closePopup: () => any // TODO: generalize
}
interface IPopupState {
    disableDragging: boolean
    position: {
        x: number
        y: number
    }
}
class PopUp extends React.Component<IPopUpProps & IPopupPassedProps, IPopupState> {
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
                popup
            }
        } = this;

        const { position } = this.state;
        const disableDragging = () => {
            this.setState({
                disableDragging: true
            });
        };
        const enableDragging = () => {
            this.setState({
                disableDragging: false
            });
        };
        const handleDraggingStop = (e: MouseEvent, data: DraggableData) => {
            this.setState({
                position: {
                    x: data.lastX,
                    y: data.lastY
                }
            });
        };

        return (
            <Draggable defaultClassName={classNames(classes.root, classes.selected)}
                       handle={`.${classes.titleBar}`}
                       bounds='parent'
                       position={ position }
                       onStop={handleDraggingStop}>

                <div>
                    <div className={classes.titleBar}
                         onMouseEnter={enableDragging}>

                        <div className={classes.left}>
                            <img src={errorIcon} />
                            <span className={classes.title}>{popup.title}</span>
                        </div>
                        <div className={classes.right}>

                            <button type='button'
                                    onMouseUp={() => props.closePopup()}
                                    className={classes.close}
                                    onMouseEnter={disableDragging}
                                    onMouseLeave={enableDragging}>
                                <Icon className={classes.icon}>close</Icon>
                            </button>
                        </div>

                    </div>

                    <div className={classNames(classes.content, classes.popupContent)}>
                        {popup.content}
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
)(PopUp);
