import * as React from 'react';
import {IStore} from '../../store/initialize';
import {connect} from 'react-redux';
import '../../transitions/zoom.scss';
import * as classes from './StartMenu.module.scss';
import * as actions from '../../store/actions';
import applications, {ApplicationId} from '../../appdata/applications';
import {Button, Icon} from '@material-ui/core';
import StartMenuTile from './StartMenuTile/StartMenuTile';
import {OuterContextType} from '../ContextMenu/specific/ApplicationContextMenu';
import * as allProgramsSrc from '../../assets/images/icons/073-play.svg';

export interface IStartMenuPassedProps {
    pinnedApplications: ApplicationId[]
    recentApplications: ApplicationId[]
    userName: string
    imageSrc: string
    closeStartMenu: () => void
    openWindow: (applicationId: ApplicationId) => void
    addRecentApplicationToStartMenu: (id: ApplicationId) => void
    taskbarHeight: number
}
export interface IStartMenuState {
    allProgramsOpened: boolean
}

export class StartMenu extends React.Component<IStartMenuPassedProps, IStartMenuState> {
    public state = {
        allProgramsOpened: false
    };
    public render() {
        const { props, props: { taskbarHeight, userName, imageSrc, pinnedApplications, recentApplications } } = this;
        const { allProgramsOpened } = this.state;

        let canCloseOnClick = true;
        const openWindow = (applicationId: ApplicationId) => {
            props.openWindow(applicationId);
            props.addRecentApplicationToStartMenu(applicationId);
        };
        const maxAppsShownOnTheLeft = 7;

        return (
            <div className={classes.root}
                 onClick={() => canCloseOnClick ? props.closeStartMenu() : null}>
                <div className={classes.startMenu}
                     style={{ bottom: taskbarHeight }}
                     onMouseOver={() => { canCloseOnClick = false }}
                     onMouseLeave={() => { canCloseOnClick = true }}>
                    <div className={classes.top}>
                        <img src={imageSrc}/> <span>{userName}</span>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.left}>
                            {allProgramsOpened ? (
                                <>
                                    <div className={classes.allProgramsList}>
                                        {applications.slice(0, maxAppsShownOnTheLeft).map(app => (
                                            <React.Fragment key={`start-menu-tile-allprograms-${app.id}`}>
                                                <div className={classes.tileWrapper}>
                                                    <StartMenuTile context={OuterContextType.STARTMENU_ALL}
                                                                   applicationId={app.id}
                                                                   closeStartMenu={props.closeStartMenu}
                                                                   openWindow={openWindow}/>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {pinnedApplications.length ? (
                                        <>
                                            <div className={classes.title}>Pinned</div>
                                            <div>
                                                {pinnedApplications.slice(0, maxAppsShownOnTheLeft).map(appId => (
                                                    <React.Fragment key={`start-menu-tile-pinned-${appId}`}>
                                                        <div className={classes.tileWrapper}>
                                                            <StartMenuTile context={OuterContextType.STARTMENU_PINNED}
                                                                           applicationId={appId}
                                                                           closeStartMenu={props.closeStartMenu}
                                                                           openWindow={openWindow}/>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            {pinnedApplications.length >= maxAppsShownOnTheLeft ? null : <hr/>}
                                        </>
                                    ) : null}

                                    {pinnedApplications.length >= maxAppsShownOnTheLeft ? null : (
                                        <>
                                            <div className={classes.title}>Recent</div>
                                            <div>
                                                {pinnedApplications.length >= maxAppsShownOnTheLeft ? null :
                                                    recentApplications.length ?
                                                        recentApplications
                                                            .slice(0, maxAppsShownOnTheLeft - pinnedApplications.length)
                                                            .map(appId => (
                                                                <div key={`start-menu-tile-recent-${appId}`}
                                                                     className={classes.tileWrapper}>
                                                                    <StartMenuTile context={OuterContextType.STARTMENU_RECENT}
                                                                                   applicationId={appId}
                                                                                   closeStartMenu={props.closeStartMenu}
                                                                                   openWindow={openWindow}/>
                                                                </div>
                                                            ))
                                                        :
                                                        (<div className={classes.noItemsMessage}>No applications were opened recently</div>)
                                                }
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            <div className={classes.allProgramsButton}>
                                <hr/>
                                <Button onClick={() => this.setState((state) => ({ allProgramsOpened: !state.allProgramsOpened }))}>
                                    <div className={classes.allProgramsButtonContent}>
                                        {allProgramsOpened ? <img src={allProgramsSrc} className={classes.flipped}/> : null}
                                        <span>{allProgramsOpened ? 'Back' : 'All programs'}</span>
                                        {!allProgramsOpened ? <img src={allProgramsSrc}/> : null}
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className={classes.right}>

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
    const { pinnedApplications, recentApplications } = state.startmenu;
    return { taskbarHeight: height, userName: name, imageSrc, pinnedApplications, recentApplications }
};

const mapDispatchToProps = (dispatch: any): Partial<IStartMenuPassedProps> => ({
    closeStartMenu: () => dispatch(actions.closeStartMenu()),
    openWindow: (applicationId: ApplicationId) => dispatch(actions.openWindow(applicationId)),
    addRecentApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.addRecentApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartMenu);
