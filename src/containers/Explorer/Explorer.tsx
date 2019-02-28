import * as React from 'react';
import * as classes from './Explorer.module.scss';
import Window, { IDefaultWindowProps } from '../../components/Window/Window';
import ExplorerContent from './ExplorerContent/ExplorerContent';
import {IStore} from '../../store/initialize';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import {User} from '../../apptypings/user';
import {EclipticFile, Folder} from '../../apptypings/filesystem';

export enum ExplorerView {
    DETAILS = 'DETAILS',
    TILE = 'TILE',
}

export interface ExplorerLocation {
    selectedDrive: string
    currentLocation: string[]
}

export interface IExplorerWindowState extends ExplorerLocation {
    shiftKeyPressed: boolean
    ctrlKeyPressed: boolean
    view: ExplorerView
    selectedItems: string[]
    history: ExplorerLocation[]
}
export interface IExplorerWindowPassedProps {
    drives: {
        [drive: string]: (Folder | EclipticFile)[]
    }
    detachedDrives: {
        [drive: string]: (Folder | EclipticFile)[]
    }
    updateWindowTitle: (instanceId: number, title: string) => void
    attachDrive: (drive: string) => void
    detachDrive: (drive: string) => void
    createFolder: (drive: string, location: string[], name: string) => void
    removeFolder: (drive: string, location: string[], name: string) => void
    createFile: (drive: string, location: string[], name: string, user: User) => void
    removeFile: (drive: string, location: string[], name: string, user: User) => void
}

export class Explorer extends React.Component<IDefaultWindowProps & IExplorerWindowPassedProps, IExplorerWindowState> {
    public state = {
        shiftKeyPressed: false,
        ctrlKeyPressed: false,
        view: ExplorerView.TILE,
        selectedDrive: null as string,
        currentLocation: [] as string[],
        selectedItems: [] as string[],
        history: [] as any[]
    };
    componentDidMount(): void {
        this.updateWindowTitle(null, []);
    }

    public render() {
        const {
            props, props: { windowInstance, drives, detachedDrives },
            state, state: { selectedDrive, currentLocation, selectedItems, view }
        } = this;

        // windowInstance.application.window.title = !selectedDrive ? 'My Computer' : `${selectedDrive}:/${currentLocation.map(loc => `${loc}/`)}`;
        return (
            <Window.Default windowInstance={windowInstance}>
                <div className={classes.root}
                     onKeyDown={this.handleKeyDown.bind(this)}
                     onKeyUp={this.handleKeyUp.bind(this)}
                     onClick={this.removeSelection.bind(this)}
                     tabIndex={0}
                >
                    <ExplorerContent drives={drives}
                                     view={view}
                                     selectedDrive={selectedDrive}
                                     currentLocation={currentLocation}
                                     selectedItems={selectedItems}
                                     onDriveOpen={this.openDrive.bind(this)}
                                     onSelectItem={this.selectItem.bind(this)}
                                     onOpenFolder={this.openFolder.bind(this)}
                                     onOpenFile={this.openFile.bind(this)}
                    />
                </div>
            </Window.Default>
        );
    }

    private handleKeyDown(e: Partial<KeyboardEvent>) {
        if (e.keyCode === 16) {
            this.setState({ shiftKeyPressed: true })
        } else if (e.keyCode === 17) {
            this.setState({ ctrlKeyPressed: true })
        }
    }
    private handleKeyUp(e: Partial<KeyboardEvent>) {
        if (e.keyCode === 16) {
            this.setState({ shiftKeyPressed: false })
        } else if (e.keyCode === 17) {
            this.setState({ ctrlKeyPressed: false })
        }
    }
    private openDrive(drive: string) {
        console.log('opening drive...', drive);
        this.setState((prevState) =>  {
            this.updateWindowTitle(drive, prevState.currentLocation);
            return { selectedDrive: drive }
        });
    }
    private removeSelection() {
        console.log('removing selection...');
        this.setState({ selectedItems: [] })
    }
    private selectItem(name: string) {
        console.log('selecting item...', name);
        this.setState((oldState) => {
            if (oldState.ctrlKeyPressed) {
                if (oldState.selectedItems.includes(name)) {
                    return { selectedItems: [...oldState.selectedItems].filter(n => n !== name) }
                } else {
                    return { selectedItems: [...oldState.selectedItems, name] }
                }
            } else if (oldState.shiftKeyPressed) {

            } else {
                return { selectedItems: [name] }
            }
        })
    }
    private openFolder(name: string) {
        console.log('openFolder...', name);
        this.setState(prevState => {
            const newLocation = [...prevState.currentLocation, name];
            this.updateWindowTitle(prevState.selectedDrive, newLocation);
            return { currentLocation: newLocation }
        })
    }
    private openFile(name: string) {
        console.log('openFile...', name);
    }

    private updateWindowTitle(selectedDrive: string, currentLocation: string[]) {
        console.log('title updated!');
        const { props: { windowInstance }} = this;
        this.props.updateWindowTitle(
            windowInstance.instanceId,
            !selectedDrive ? 'My Computer' : `${selectedDrive}:/${currentLocation.map((loc, i) => `${loc}${i !== currentLocation.length - 1 ? '/' : ''}`).join('')}`
        );
    }
}

const mapStateToProps = (state: IStore) => {
    const { drives, detachedDrives } = state.storage;
    return { drives, detachedDrives }
};
const mapDispatchToProps = (dispatch: any): Partial<IExplorerWindowPassedProps> => ({
    updateWindowTitle: (instanceId: number, title: string) => dispatch(actions.updateWindowTitle(instanceId, title)),
    attachDrive: (drive: string) => dispatch(actions.attachDrive(drive)),
    detachDrive: (drive: string) => dispatch(actions.detachDrive(drive)),
    createFolder: (drive: string, location: string[], name: string) => dispatch(actions.createFolder(drive, location, name)),
    removeFolder: (drive: string, location: string[], name: string) => dispatch(actions.removeFolder(drive, location, name)),
    createFile: (drive: string, location: string[], name: string, user: User) => dispatch(actions.createFile(drive, location, name, user)),
    removeFile: (drive: string, location: string[], name: string, user: User) => dispatch(actions.removeFile(drive, location, name, user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
