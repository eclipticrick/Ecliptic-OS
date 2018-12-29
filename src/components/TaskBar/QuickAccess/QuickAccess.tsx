import * as React from 'react';
import * as classes from './QuickAccess.module.scss';
import {ApplicationId} from '../../../appdata/applications';
import applications from '../../../appdata/applications';
import {Button} from '@material-ui/core';
import Resizable from 're-resizable';
import ApplicationContextMenu, {OuterContextType} from '../../ContextMenu/specific/ApplicationContextMenu';

export interface IQuickAccessProps {
    shortcuts: ApplicationId[]
    width: number
    setQuickAccessWidth: (width: number) => void
    openWindow: (applicationId: ApplicationId) => void
}

const quickAccess = (props: IQuickAccessProps) => {
    const { width, shortcuts } = props;

    const imageSize = 18;
    const imageButtonSize = 26;
    const imageButtonSizeMargin = 32;
    const extraSpacing = 12;

    return (
        <div className={classes.root}>
            <div className={classes.innerRoot}>
                <Resizable
                    className={classes.resizableDiv}
                    size={{ width }}
                    enable={{right: true}}
                    minWidth={imageButtonSizeMargin + extraSpacing}
                    maxWidth={shortcuts.length * imageButtonSizeMargin + extraSpacing}
                    onResizeStop={(e, direction, ref, d) => {
                        props.setQuickAccessWidth(width + d.width);
                    }}>
                    {shortcuts.map(shortcut => {
                        const application = applications.find(app => app.id === shortcut);
                        return (
                            <React.Fragment key={`quick-access-${application.id}`}>
                                <ApplicationContextMenu applicationId={application.id} context={OuterContextType.TASKBAR_QUICKACCESS}>
                                    <Button onClick={() => props.openWindow(application.id)}
                                            variant={'contained'}
                                            style={{ width: imageButtonSize, height: imageButtonSize }}>
                                        <img src={application.icon.src}
                                             aria-label={application.icon.name}
                                             style={{ width: imageSize, height: imageSize }}/>
                                    </Button>
                                </ApplicationContextMenu>
                            </React.Fragment>
                        )
                    })}
                </Resizable>
            </div>
        </div>
    );
};

export default quickAccess;
