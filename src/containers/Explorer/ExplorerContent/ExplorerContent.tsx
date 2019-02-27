import * as React from 'react';
import * as classes from './ExplorerContent.module.scss';
import {ExplorerView, IExplorerWindowPassedProps} from '../Explorer';
import {FileSystemDiscriminator} from '../../../apptypings/filesystem';
import * as folderIcon from '../../../assets/images/icons/026-folder-1.svg';
import * as fileIcon from '../../../assets/images/icons/062-file.svg';
import Resizable from 're-resizable';
import TileIcon from './TileIcon/TileIcon';

export interface IExplorerContentProps {
    view: ExplorerView
    selectedDrive: string
    currentLocation: string[]
    selectedItems: string[]
    onDriveSelection: (drive: string) => void
    onOpenFolder: (name: string) => void
    onOpenFile: (name: string) => void
    onSelectItem: (name: string) => void
}
const explorerContent = (props: IExplorerContentProps & Partial<IExplorerWindowPassedProps>) => {
    const { drives, selectedDrive, currentLocation, selectedItems } = props;
    const templates = {
        driveSelection: () => (
            <>
                {Object.keys(drives).map(driveLetter => (
                    <div key={`drive-list-${driveLetter}`} onClick={() => props.onDriveSelection(driveLetter)}>
                        { driveLetter }
                    </div>
                ))}
            </>
        ),
        fileExplorer: () => (
            <>
                <div className={classes.fileExplorerWrapper}>
                    {drives[selectedDrive].map(fileOrFolder => {
                        const template = (iconSrc: string, name: string, itemProps: any) => (
                            <TileIcon iconSrc={iconSrc}
                                      name={name}
                                      selected={selectedItems.includes(name)}
                                      {...itemProps}
                                      onClick={() => props.onSelectItem(name)}
                                      key={`explorer-list-${fileOrFolder.discriminator}-${fileOrFolder.name}`}/>
                        );
                        if (fileOrFolder.discriminator === FileSystemDiscriminator.FOLDER) {
                            return template(
                                fileOrFolder.customIcon ? fileOrFolder.customIcon : folderIcon,
                                fileOrFolder.name,
                                {
                                    onDoubleClick: () => props.onOpenFolder(name),
                                }
                            );
                        } else if (fileOrFolder.discriminator === FileSystemDiscriminator.FILE) {
                            return template(
                                fileIcon,
                                fileOrFolder.name,
                                {
                                    onDoubleClick: () => props.onOpenFile(name),
                                }
                            );
                        } else {
                            return <>unknown file type</>
                        }
                    })}
                </div>

            </>
        )
    };
    return (
        <>
            {!selectedDrive ? templates.driveSelection() : templates.fileExplorer()}
        </>
    );
};

export default explorerContent;
