import * as React from 'react';
import classNames from 'classnames';
import * as classes from './Window.module.scss';
import Draggable, {DraggableData} from 'react-draggable';
import Resizable, {ResizableDirection} from 're-resizable';
import {Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {IWindowInstance} from '../../../apptypings/window';
import {IStore} from "../../../store/initialize";

export interface IWindowBaseProps {
    windowInstance: IWindowInstance
    title: string
    iconSrc: string
    maximizable: boolean
    minHeight: number
    minWidth: number
    showMaximizeButton: boolean,
    showMinimizeButton: boolean,
    defaultPosition?: {
        x: number
        y: number
    }
}
interface IWindowBasePassedProps {
    windows: IWindowInstance[]
    closeWindow: (instanceId: number) => void
    selectWindow: (instanceId: number) => void
    minimizeWindow: (instanceId: number) => void
    maximizeWindow: (instanceId: number) => void
    normalizeWindow: (instanceId: number) => void
}
interface IWindowBaseState {
    disableDragging: boolean
    position: {
        x: number
        y: number
    }
    resizeLimit: {
        w: number
        h: number
    }
}

const defaultProps: Partial<IWindowBaseProps> = {
    minHeight: 250,
    minWidth: 250,
    defaultPosition: {
        x: 5,
        y: 5
    }
};

const disableDragging = (self: any) => {
    self.setState({
        disableDragging: true
    });
};
const enableDragging = (self: any) => {
    self.setState({
        disableDragging: false
    });
};
const handleDraggingStop = (e: MouseEvent, data: DraggableData, self: any) => {
    self.setState({
        position: {
            x: data.lastX,
            y: data.lastY
        }
    });
};

class WindowBase extends React.Component<IWindowBaseProps & IWindowBasePassedProps, IWindowBaseState> {
    public state = {
        disableDragging: false,
        position: {
            x: 0,
            y: 0
        },
        resizeLimit: {
            w: 0,
            h: 0
        }
    };

    public componentWillMount() {
        const { defaultPosition, windowInstance } = this.props;
        this.setState({
            position: windowInstance.maximized ? { x: 0, y: 0 } : defaultPosition || defaultProps.defaultPosition
        })
    }

    public render() {
        const {
            props,
            props: {
                windowInstance,
                title,
                iconSrc,
                maximizable,
                minHeight,
                minWidth,
                defaultPosition,
                showMaximizeButton,
                showMinimizeButton,
                windows,
                children
            }
        } = this;

        let selected = false;
        const visibleWindows = windows.filter(w => w.minimized === false);
        if (visibleWindows.length) {
            selected = visibleWindows[visibleWindows.length - 1].instanceId === windowInstance.instanceId
        }

        const { position, resizeLimit } = this.state;

        const handleDraggingStart = (): false | void => {
            if (windowInstance.maximized || this.state.disableDragging) {
                return false
            }
        };

        const handleResizeStart = (
            e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
            direction: ResizableDirection,
            ref: HTMLDivElement
        ) => {
            const { offsetWidth, offsetHeight } = ref.parentElement;
            this.setState({
                resizeLimit: {
                    w: offsetWidth - position.x,
                    h: offsetHeight - position.y
                }
            });
        };

        return (
            <Draggable defaultClassName={classNames(
                classes.root,
                windowInstance.maximized ? classes.maximized : null,
                windowInstance.minimized ? classes.minimized : null,
                selected ? classes.selected : null
            )}
                       handle={`.${classes.titleBar}`}
                       bounds='parent'
                       position={ position }
                       defaultPosition={ defaultPosition || defaultProps.defaultPosition }
                       onStart={handleDraggingStart}
                       onStop={(e: MouseEvent, data: DraggableData) => handleDraggingStop(e, data, this)}
                       onMouseDown={() => props.selectWindow(windowInstance.instanceId)}>

                <Resizable enable={ windowInstance.maximized || !maximizable ? {} : { bottom: true, bottomRight: true, right: true }}
                           minWidth={ minWidth || defaultProps.minWidth }
                           minHeight={ minHeight || defaultProps.minHeight }
                           maxWidth={ windowInstance.maximized ? null : resizeLimit.w }
                           maxHeight={ windowInstance.maximized ? null : resizeLimit.h }
                           defaultSize={{
                               width: minWidth || defaultProps.minWidth,
                               height: minHeight || defaultProps.minHeight,
                           }}
                           size={windowInstance.maximized ? { width: '100%', height: '100%' } : null}
                           onResizeStart={handleResizeStart}>

                    <div className={classes.titleBar}
                         onMouseEnter={() => enableDragging(this)}
                         onDoubleClick={
                             () =>
                                 maximizable ?
                                     windowInstance.maximized ?
                                         this._handleNormalizeWindow(windowInstance.instanceId) :
                                         this._handleMaximizeWindow(windowInstance.instanceId) :
                                     null
                         }>

                        <div className={classes.left}>
                            <img alt='icon' src={iconSrc} />
                            <span className={classes.title}>{title}</span>
                        </div>
                        <div className={classes.right}>
                            {!showMinimizeButton ? null : (
                                <button type='button'
                                        onMouseUp={() => props.minimizeWindow(windowInstance.instanceId)}
                                        className={classes.minimize}
                                        onMouseEnter={() => disableDragging(this)}
                                        onMouseLeave={() => enableDragging(this)}>
                                    <Icon className={classes.icon}>minimize</Icon>
                                </button>
                            )}
                            {!showMaximizeButton ? null : windowInstance.maximized ?
                                <button type='button'
                                        onMouseUp={() => this._handleNormalizeWindow(windowInstance.instanceId)}
                                        className={classes.maximize}
                                        onMouseEnter={() => disableDragging(this)}
                                        onMouseLeave={() => enableDragging(this)}>
                                    <Icon className={classes.icon}>fullscreen_exit</Icon>
                                </button>
                                :
                                <button type='button'
                                        onMouseUp={() => this._handleMaximizeWindow(windowInstance.instanceId)}
                                        className={classes.maximize}
                                        onMouseEnter={() => disableDragging(this)}
                                        onMouseLeave={() => enableDragging(this)}
                                        disabled={!maximizable}>
                                    <Icon className={classes.icon}>fullscreen</Icon>
                                </button>
                            }
                            <button type='button'
                                    onMouseUp={() => props.closeWindow(windowInstance.instanceId)}
                                    className={classes.close}
                                    onMouseEnter={() => disableDragging(this)}
                                    onMouseLeave={() => enableDragging(this)}>
                                <Icon className={classes.icon}>close</Icon>
                            </button>
                        </div>

                    </div>

                    <div className={classes.content}>
                        { children }
                    </div>
                </Resizable>
            </Draggable>
        )
    }

    private _handleMaximizeWindow(instanceId: number) {
        this.props.maximizeWindow(instanceId);
        this.setState({
            position: { x: 0, y: 0 }
        });
    }
    private _handleNormalizeWindow(instanceId: number) {
        const { defaultPosition } = this.props;

        this.props.normalizeWindow(instanceId);
        this.setState({
            position: defaultPosition || defaultProps.defaultPosition
        })
    }
}

const mapStateToProps = (state: IStore) => {
    const { windows } = state.windows;
    return { windows }
};
const mapDispatchToProps = (dispatch: any): Partial<IWindowBasePassedProps> => ({
    closeWindow: (id: number) => dispatch(actions.closeWindow(id)),
    selectWindow: (id: number) => dispatch(actions.selectWindow(id)),
    minimizeWindow: (id: number) => dispatch(actions.minimizeWindow(id)),
    maximizeWindow: (id: number) => dispatch(actions.maximizeWindow(id)),
    normalizeWindow: (id: number) => dispatch(actions.normalizeWindow(id))
});
export default connect<Partial<IWindowBasePassedProps>, Partial<IWindowBasePassedProps>, IWindowBaseProps>(
    mapStateToProps, mapDispatchToProps
)(WindowBase);
