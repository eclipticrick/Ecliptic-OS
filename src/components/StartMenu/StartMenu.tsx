import * as React from 'react';
import {IStore} from '../../store/initialize';
import {connect} from 'react-redux';
import '../../transitions/zoom.scss';
import * as classes from './StartMenu.module.scss';
import * as actions from '../../store/actions';
import applications, {ApplicationId, DisplayLevel, IApplication} from '../../appdata/applications';
import {Button, Icon} from '@material-ui/core';
import StartMenuTileList from './StartMenuTileList/StartMenuTileList';
import {OuterContextType} from '../ContextMenu/specific/ApplicationContextMenu/ApplicationContextMenu';
import * as allProgramsSrc from '../../assets/images/icons/073-play.svg';

export interface IStartMenuPassedProps {
    pinnedApplications: ApplicationId[]
    recentApplications: ApplicationId[]
    userName: string
    imageSrc: string
    closeStartMenu: () => void
    openWindow: (application: IApplication) => void
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
        const openWindow = (application: IApplication) => {
            props.openWindow(application);
            props.addRecentApplicationToStartMenu(application.id);
        };
        const maxAppsShownOnTheLeft = 7;

        const applicationsForStartMenu: ApplicationId[] = applications
            .filter(app => app.display === DisplayLevel.VISIBLE_EVERYWHERE)
            .map(app => app.id);

        const pane = {
            top: (
                <>
                    <img alt='user' src={imageSrc}/>
                    <span>{userName}</span>
                </>
            ),
            bottom: (
                <>
                    <Button className={classes.button}>
                        <Icon className={classes.icon}>lock</Icon>
                        Log Off
                    </Button>
                    <Button className={classes.button}>
                        <Icon className={classes.icon}>power_settings_new</Icon>
                        Shutdown
                    </Button>
                </>
            ),
            left: (
                <>
                    {allProgramsOpened ? (
                        <div className={classes.allProgramsList}>
                            <StartMenuTileList applicationIds={applicationsForStartMenu}
                                               context={OuterContextType.STARTMENU_ALL}
                                               closeStartMenu={props.closeStartMenu}
                                               openWindow={openWindow}/>
                        </div>
                    ) : (
                        <>
                            {pinnedApplications.length ? (
                                <>
                                    <div className={classes.title}>Pinned</div>
                                    <div>
                                        <StartMenuTileList applicationIds={pinnedApplications.slice(0, maxAppsShownOnTheLeft)}
                                                           context={OuterContextType.STARTMENU_PINNED}
                                                           closeStartMenu={props.closeStartMenu}
                                                           openWindow={openWindow}/>
                                    </div>
                                    {pinnedApplications.length >= maxAppsShownOnTheLeft ? null : <hr/>}
                                </>
                            ) : null}

                            {pinnedApplications.length >= maxAppsShownOnTheLeft ? null : (
                                <>
                                    <div className={classes.title}>Recent</div>
                                    <div>
                                        {pinnedApplications.length >= maxAppsShownOnTheLeft ? null :
                                            recentApplications.length ? (
                                                    <StartMenuTileList applicationIds={recentApplications.slice(0, maxAppsShownOnTheLeft - pinnedApplications.length)}
                                                                       context={OuterContextType.STARTMENU_RECENT}
                                                                       closeStartMenu={props.closeStartMenu}
                                                                       openWindow={openWindow}/>
                                                )
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
                                {allProgramsOpened ? <img alt='all programs' src={allProgramsSrc} className={classes.flipped}/> : null}
                                <span>{allProgramsOpened ? 'Back' : 'All programs'}</span>
                                {!allProgramsOpened ? <img alt='all programs' src={allProgramsSrc}/> : null}
                            </div>
                        </Button>
                    </div>
                </>
            ),
            right: (
                <>

                </>
            )
        };

        return (
            <div className={classes.root}
                 onClick={() => canCloseOnClick ? props.closeStartMenu() : null}>
                <div className={classes.startMenu}
                     style={{ bottom: taskbarHeight }}
                     onMouseOver={() => { canCloseOnClick = false }}
                     onMouseLeave={() => { canCloseOnClick = true }}>

                    <div className={classes.top}>{pane.top}</div>
                    <div className={classes.content}>
                        <div className={classes.left}>{pane.left}</div>
                        <div className={classes.right}>{pane.right}</div>
                    </div>
                    <div className={classes.bottom}>{pane.bottom}</div>

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
    openWindow: (application: IApplication) => dispatch(actions.openWindow(application)),
    addRecentApplicationToStartMenu: (id: ApplicationId) => dispatch(actions.addRecentApplicationToStartMenu(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartMenu);
