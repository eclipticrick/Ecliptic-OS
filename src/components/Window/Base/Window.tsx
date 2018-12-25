import * as React from 'react';
import classNames from 'classnames';
import * as classes from './Window.module.scss';
import Draggable, {DraggableData} from 'react-draggable';
import Resizable, {ResizableDirection} from 're-resizable';
import {Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import {ApplicationId} from '../../../appdata/applications';
import * as actions from '../../../store/actions/index';

export interface IWindowProps {
    instanceId: number
    applicationId: ApplicationId
    title: string
    iconSrc: string
    maximized: boolean
    minimized: boolean
    selected: boolean
    maximizable: boolean
    minHeight?: number
    minWidth?: number
    defaultPosition?: {
        x: number
        y: number
    }
}
interface IWindowPassedProps {
    closeWindow: (instanceId: number) => any // TODO: generalize?
    selectWindow: (instanceId: number) => any // TODO: generalize?
    minimizeWindow: (instanceId: number) => any // TODO: generalize?
    maximizeWindow: (instanceId: number) => any // TODO: generalize?
    normalizeWindow: (instanceId: number) => any // TODO: generalize?
}
interface IWindowState {
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

const defaultProps: Partial<IWindowProps> = {
    minHeight: 250,
    minWidth: 250,
    defaultPosition: {
        x: 5,
        y: 5
    }
};

class Window extends React.Component<IWindowProps & IWindowPassedProps, IWindowState> {
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
        const { defaultPosition, maximized } = this.props;
        this.setState({
            position: maximized ? { x: 0, y: 0 } : defaultPosition || defaultProps.defaultPosition
        })
    }

    public render() {
        const {
            props,
            props: {
                instanceId,
                applicationId,
                title,
                iconSrc,
                minimized,
                maximized,
                maximizable,
                selected,
                minHeight,
                minWidth,
                defaultPosition,
                children
            }
        } = this;

        const { position, resizeLimit } = this.state;

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
        const handleDraggingStart = (): false | void => {
            if (maximized || this.state.disableDragging) {
                return false
            }
        };
        const handleDraggingStop = (e: MouseEvent, data: DraggableData) => {
            this.setState({
                position: {
                    x: data.lastX,
                    y: data.lastY
                }
            });
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
                maximized ? classes.maximized : null,
                minimized ? classes.minimized : null,
                selected ? classes.selected : null
            )}
                       handle={`.${classes.titleBar}`}
                       bounds='parent'
                       position={ position }
                       defaultPosition={ defaultPosition || defaultProps.defaultPosition }
                       onStart={handleDraggingStart}
                       onStop={handleDraggingStop}
                       onMouseDown={() => props.selectWindow(instanceId)}>

                <Resizable enable={ maximized || !maximizable ? {} : { bottom: true, bottomRight: true, right: true }}
                           minWidth={ minWidth || defaultProps.minWidth }
                           minHeight={ minHeight || defaultProps.minHeight }
                           maxWidth={ maximized ? null : resizeLimit.w }
                           maxHeight={ maximized ? null : resizeLimit.h }
                           defaultSize={{
                               width: minWidth || defaultProps.minWidth,
                               height: minHeight || defaultProps.minHeight,
                           }}
                           size={maximized ? { width: '100%', height: '100%' } : null}
                           onResizeStart={handleResizeStart}>

                    <div className={classes.titleBar}
                         onMouseEnter={enableDragging}
                         onDoubleClick={
                        () =>
                            maximizable ?
                                maximized ?
                                    this._handleNormalizeWindow(instanceId) :
                                    this._handleMaximizeWindow(instanceId) :
                            null
                    }>

                        <div className={classes.left}>
                            <img src={iconSrc} />
                            <span className={classes.title}>{title}</span>
                        </div>
                        <div className={classes.right}>
                            <button type='button'
                                    onMouseUp={() => props.minimizeWindow(instanceId)}
                                    className={classes.minimize}
                                    onMouseEnter={disableDragging}
                                    onMouseLeave={enableDragging}>
                                <Icon className={classes.icon}>minimize</Icon>
                            </button>
                            {maximized ?
                                <button type='button'
                                        onMouseUp={() => this._handleNormalizeWindow(instanceId)}
                                        className={classes.maximize}
                                        onMouseEnter={disableDragging}
                                        onMouseLeave={enableDragging}>
                                    <Icon className={classes.icon}>fullscreen_exit</Icon>
                                </button>
                            :
                                <button type='button'
                                        onMouseUp={() => this._handleMaximizeWindow(instanceId)}
                                        className={classes.maximize}
                                        onMouseEnter={disableDragging}
                                        onMouseLeave={enableDragging}
                                        disabled={!maximizable}>
                                    <Icon className={classes.icon}>fullscreen</Icon>
                                </button>}
                            <button type='button'
                                    onMouseUp={() => props.closeWindow(instanceId)}
                                    className={classes.close}
                                    onMouseEnter={disableDragging}
                                    onMouseLeave={enableDragging}>
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

const mapDispatchToProps = (dispatch: any): Partial<IWindowPassedProps> => ({
    closeWindow: (id: number) => dispatch(actions.closeWindow(id)),
    selectWindow: (id: number) => dispatch(actions.selectWindow(id)),
    minimizeWindow: (id: number) => dispatch(actions.minimizeWindow(id)),
    maximizeWindow: (id: number) => dispatch(actions.maximizeWindow(id)),
    normalizeWindow: (id: number) => dispatch(actions.normalizeWindow(id))
});
export default connect<Partial<IWindowPassedProps>, Partial<IWindowPassedProps>, IWindowProps>(
    null, mapDispatchToProps
)(Window);
