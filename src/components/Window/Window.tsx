import * as React from 'react';
import * as classes from './Window.module.scss';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';
import * as iconSrc from '../../assets/images/windows-logo.svg';
import {Icon} from '@material-ui/core';

interface IWindowProps {
    title: string
    minHeight?: number
    minWidth?: number
    defaultPosition?: {
        x: number
        y: number
    }
    children: any // TODO: fix this with a react-component interface?
}

interface IWindowState {
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

class Window extends React.Component<IWindowProps, IWindowState> {
    public state = {
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
        const { defaultPosition } = this.props;
        this.setState({
            position: defaultPosition || defaultProps.defaultPosition
        })
    }

    public render() {
        const { title, minHeight, minWidth, defaultPosition, children } = this.props;
        const { position, resizeLimit } = this.state;

        return (
            <Draggable defaultClassName={classes.root}
                       handle={`.${classes.titleBar}`}
                       bounds='parent'
                       position={ position }
                       defaultPosition={ defaultPosition || defaultProps.defaultPosition }
                       onStop={(e: MouseEvent, data: any) => {
                           this.setState({
                               position: {
                                   x: data.lastX,
                                   y: data.lastY
                               }
                           });
                       }}>
                <Resizable enable={{ bottom: true, bottomRight: true, right: true }}
                           minWidth={ minWidth || defaultProps.minWidth }
                           minHeight={ minHeight || defaultProps.minHeight }
                           maxWidth={resizeLimit.w}
                           maxHeight={resizeLimit.h}
                           defaultSize={{
                               width: minWidth || defaultProps.minWidth,
                               height: minHeight || defaultProps.minHeight,
                           }}
                           onResizeStart={(e, direction, ref) => {
                               const { offsetWidth, offsetHeight } = ref.parentElement;
                               this.setState({
                                   resizeLimit: {
                                       w: offsetWidth - position.x,
                                       h: offsetHeight - position.y
                                   }
                               });
                           }}>

                    <div className={classes.titleBar}>

                        <div className={classes.left}>
                            <img src={iconSrc} />
                            <span className={classes.title}>{title}</span>
                        </div>
                        <div className={classes.right}>
                            <button type='button' className={classes.minimize}>
                                <Icon className={classes.icon}>minimize</Icon>
                            </button>
                            <button type='button' className={classes.maximize}>
                                <Icon className={classes.icon}>fullscreen</Icon>
                            </button>
                            <button type='button' className={classes.close}>
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
}
// const window = ({ title, minHeight, minWidth, defaultPosition, children }: IWindowProps) => (
//     <Draggable defaultClassName={classes.root}
//                handle={`.${classes.titleBar}`}
//                bounds='parent'
//                defaultPosition={
//                    defaultPosition ||
//                    {x: 5, y: 5}
//                }
//                onStop={(e: MouseEvent, data: any) => {
//                    console.log('Event: ', e);
//                    console.log('Data: ', data);
//                    console.log('Data: ', data.screenX);
//                    console.log('Data: ', data.screenY);
//                }}>
//         <Resizable enable={{ bottom: true, bottomRight: true, right: true }}
//                    minHeight={minHeight || 250}
//                    minWidth={minWidth || 250}
//                    maxHeight={400}
//                    defaultSize={{
//                        width: minHeight || 250,
//                        height: minWidth || 250,
//                    }}
//                    onResizeStop={(e, direction, ref, d) => {
//                        console.log(e, direction, ref, d);
//                        // props.setTaskbarHeight(height + d.height);
//
//                        /// console.log('Parent width: ' + ref.child.parentNode.clientWidth);
//                        // alert('Parent width: ' + this.refs.child.parentNode.clientWidth);
//                    }}
//         >
//
//             <div className={classes.titleBar}>
//
//                 <div className={classes.left}>
//                     <img src={iconSrc} />
//                     <span className={classes.title}>{title}</span>
//                 </div>
//                 <div className={classes.right}>
//                     <button type='button' className={classes.minimize}>
//                         <Icon className={classes.icon}>minimize</Icon>
//                     </button>
//                     <button type='button' className={classes.maximize}>
//                         <Icon className={classes.icon}>fullscreen</Icon>
//                     </button>
//                     <button type='button' className={classes.close}>
//                         <Icon className={classes.icon}>close</Icon>
//                     </button>
//                 </div>
//
//             </div>
//
//             <div className={classes.content}>
//                 { children }
//             </div>
//         </Resizable>
//     </Draggable>
// );

export default Window;
