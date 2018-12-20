import * as React from 'react';
import * as classes from './TaskBar.module.scss';
import {IStore} from '../../store/initialize';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Resizable from 're-resizable';
import StartButton from './StartButton/StartButton';

export interface ITaskbarProps {
    height: number
    setTaskbarHeight: (height: number) => void
}

export class TaskBar extends React.Component<ITaskbarProps, {}> {
    public render() {
        const { props, props: { height } } = this;
        
        return (
            <div className={classes.root}>
                <Resizable
                    size={{ height }}
                    enable={{top: true}}
                    minHeight={30}
                    maxHeight={50}
                    onResizeStop={(e, direction, ref, d) => {
                        props.setTaskbarHeight(height + d.height);
                    }}>
                    <StartButton/>
                </Resizable>
            </div>
        );
    }

}
const mapStateToProps = (state: IStore) => {
    const { taskbar: { height } } = state.config;
    return { height }
};

const mapDispatchToProps = (dispatch: any): Partial<ITaskbarProps> => ({
    setTaskbarHeight: (height: number) => dispatch(actions.setTaskbarHeight(height)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);
