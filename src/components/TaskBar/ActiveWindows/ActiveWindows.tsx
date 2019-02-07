import * as React from 'react';
import * as classes from './ActiveWindows.module.scss';
import {IWindowInstance} from '../../../apptypings/window';
import classNames from 'classnames';

export interface IQuickAccessProps {
    windowInstances: IWindowInstance[]
    selectWindow: (instanceId: number) => void // TODO: generalize?
    minimizeWindow: (instanceId: number) => void // TODO: generalize?
}

const activeWindows = (props: IQuickAccessProps) => {
    const { windowInstances } = props;
    const unMinimizedInstances = [...windowInstances].filter(window => window.minimized === false);
    let selectedInstanceId: number;
    if (unMinimizedInstances.length) {
        selectedInstanceId = unMinimizedInstances[unMinimizedInstances.length - 1].instanceId
    }
    const sortedWindowInstances = [...windowInstances].sort((a, b) => {
        if (a.instanceId < b.instanceId) return -1;
        if (a.instanceId > b.instanceId) return 1;
        return 0;
    }
);
    return (
        <div className={classes.root}>
            <div className={classes.itemsOuterWrapper}>
                {sortedWindowInstances.map(windowInstance => {
                    const application = windowInstance.application;
                    const isSelected = selectedInstanceId === windowInstance.instanceId;
                    return (
                        <div key={`taskbar-${windowInstance.instanceId}`}
                             className={classes.itemInnerWrapper}
                             style={{ width: `${100 / windowInstances.length}%` }}>
                            <div className={classNames(classes.item, isSelected ? classes.selected : null)}
                                 onClick={
                                     () => isSelected ? props.minimizeWindow(windowInstance.instanceId) : props.selectWindow(windowInstance.instanceId)
                                 }>
                                <img src={application.icon.src} /><span>{application.window.title}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default activeWindows;
