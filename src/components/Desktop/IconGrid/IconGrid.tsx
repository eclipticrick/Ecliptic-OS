import * as React from 'react';
import * as classes from './IconGrid.module.scss';
import DesktopIcon from './DesktopIcon/DesktopIcon';
import applications, {ApplicationId, IApplication} from '../../../appdata/applications';

export interface IIconGridProps {
    shortcuts: ApplicationId[],
    openWindow: (application: IApplication) => void
}

const iconGrid = ({shortcuts, openWindow}: IIconGridProps) => {
    return (
        <div className={classes.root}>
            {shortcuts.map(applicationId => {
                const application = applications.find(app => app.id === applicationId);
                const { name, src, scale } = application.icon;
                return (
                    <DesktopIcon key={`icon-${application.id}`}
                                 application={application}
                                 name={name}
                                 iconSrc={src}
                                 scale={scale || 1}
                                 openWindow={openWindow}/>
                )
            })}
        </div>
    )
};

export default iconGrid;
