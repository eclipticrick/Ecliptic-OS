import * as React from 'react';
import * as classes from './TaskBar.module.scss';
import {IStore} from '../../store/initialize';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

export interface ITaskbarProps {
    height: number
    setTaskbarHeight: (height: number) => void
}

export class TaskBar extends React.Component<ITaskbarProps, {}> {
    public render() {
        const { props, props: { height } } = this;

        return (
            <div className={classes.root} style={{ height }}>
                <button onClick={() => props.setTaskbarHeight(Math.floor(Math.random() * 30) + 15)}
                style={{ background: 'transparent', border: 0, cursor: 'pointer', width: '100%', height: '100%' }}>
                    set random taskbar height with redux
                </button>
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
