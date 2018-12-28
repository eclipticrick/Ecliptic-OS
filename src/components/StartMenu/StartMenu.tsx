import * as React from 'react';
import {IStore} from '../../store/initialize';
import {connect} from 'react-redux';
import '../../transitions/zoom.scss';
import * as classes from './StartMenu.module.scss';
import * as actions from '../../store/actions';
import {ApplicationId} from '../../appdata/applications';
import classNames from 'classnames';
import {Button, Icon} from '@material-ui/core';
import StartMenuTile from './StartMenuTile/StartMenuTile';

export interface IStartMenuPassedProps {
    opened: boolean
    pinnedApplications: ApplicationId[]
    recentApplications: ApplicationId[]
    userName: string
    imageSrc: string
    closeStartMenu: () => void
    openWindow: (applicationId: ApplicationId) => void
    addRecentApplicationToStartMenu: (id: ApplicationId) => void
    taskbarHeight: number
}

export class StartMenu extends React.Component<IStartMenuPassedProps, {}> {
    public render() {
        const { props, props: { taskbarHeight, userName, imageSrc, opened, pinnedApplications, recentApplications } } = this;

        let canCloseOnClick = true;
        const openWindow = (applicationId: ApplicationId) => {
            props.openWindow(applicationId);
            props.addRecentApplicationToStartMenu(applicationId);
        };

        return (
            <div className={classNames(classes.root, !opened ? classes.closed : null)}
                 onClick={() => canCloseOnClick ? props.closeStartMenu() : null}>
                <div className={classes.startMenu}
                     style={{ bottom: taskbarHeight }}
                     onMouseEnter={() => { canCloseOnClick = false }}
                     onMouseLeave={() => { canCloseOnClick = true }}>
                    <div className={classes.top}>
                        <img src={imageSrc}/> <span>{userName}</span>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.left}>
                            {pinnedApplications.length ? (
                                <>
                                    <div className={classes.title}>Pinned</div>
                                    <div>
                                        {pinnedApplications.map(appId => (
                                            <div key={`start-menu-tile-pinned-${appId}`} className={classes.tileWrapper}>
                                                <StartMenuTile applicationId={appId}
                                                               closeStartMenu={props.closeStartMenu}
                                                               openWindow={openWindow}/>
                                            </div>
                                        ))}
                                    </div>
                                    <hr/>
                                </>
                            ) : null}

                            <div className={classes.title}>Recent</div>
                            <div className={classes.recentContainer}>
                                {recentApplications.length ?
                                    recentApplications.slice(0, 6).map(appId => (
                                        <div key={`start-menu-tile-recent-${appId}`} className={classes.tileWrapper}>
                                            <StartMenuTile applicationId={appId}
                                                           closeStartMenu={props.closeStartMenu}
                                                           openWindow={openWindow}/>
                                        </div>
                                    ))
                                    :
                                    (<div className={classes.noItemsMessage}>No applications were opened recently</div>)
                                }
                            </div>
                        </div>
                        <div className={classes.right}>
                            right
                        </div>
                    </div>
                    <div className={classes.bottom}>
                        <Button className={classes.button}>
                            <Icon className={classes.icon}>lock</Icon>
                            Log Off
                        </Button>
                        <Button className={classes.button}>
                            <Icon className={classes.icon}>power_settings_new</Icon>
                            Shutdown
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    const { height } = state.taskbar;
    const { name, imageSrc } = state.user;
    const { opened, pinnedApplications, recentApplications } = state.startmenu;
    return { taskbarHeight: height, userName: name, imageSrc, opened, pinnedApplications, recentApplications }
};

const mapDispatchToProps = (dispatch: any): Partial<IStartMenuPassedProps> => ({
    closeStartMenu: () => dispatch(actions.closeStartMenu()),
    openWindow: (applicationId: ApplicationId) => dispatch(actions.openWindow(applicationId)),
    addRecentApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.addRecentApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartMenu);
