import * as React from 'react';
import * as classes from './ActiveWindows.module.scss';
import {IWindowInstance} from '../../../appdata/window';
import applications from '../../../appdata/applications';
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
                {sortedWindowInstances.map(window => {
                    const application = applications.find(app => app.id === window.applicationId);
                    const isSelected = selectedInstanceId === window.instanceId;
                    return (
                        <div key={`taskbar-${window.instanceId}`}
                             className={classes.itemInnerWrapper}
                             style={{ width: `${100 / windowInstances.length}%` }}>
                            <div className={classNames(classes.item, isSelected ? classes.selected : null)}
                                 onClick={
                                     () => isSelected ? props.minimizeWindow(window.instanceId) : props.selectWindow(window.instanceId)
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
