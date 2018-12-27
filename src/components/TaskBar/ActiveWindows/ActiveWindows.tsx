import * as React from 'react';
import * as classes from './ActiveWindows.module.scss';
import {IWindowInstance} from '../../../appdata/window';
import applications from '../../../appdata/applications';

export interface IQuickAccessProps {
    windowInstances: IWindowInstance[]
    selectWindow: (instanceId: number) => void // TODO: generalize?
}

const activeWindows = (props: IQuickAccessProps) => {
    const { windowInstances } = props;
    const sortedWindowInstances = [...windowInstances].sort((a, b) => {
        if (a.instanceId < b.instanceId) return -1;
        if (a.instanceId > b.instanceId) return 1;
        return 0;
    }
);
    return (
        <div className={classes.root}>
            <div className={classes.itemsWrapper}>
                {sortedWindowInstances.map(window => {
                    const application = applications.find(app => app.id === window.applicationId);
                    return (
                        <div className={classes.itemSizeContainer} style={{ width: `${100 / windowInstances.length}%` }}>
                            <div key={`taskbar-active-window-${window.instanceId}`}
                                 className={classes.item}
                            >
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
