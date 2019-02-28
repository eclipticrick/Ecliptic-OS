import * as React from 'react';
import * as classes from './ExplorerContent.module.scss';
import {ExplorerView, IExplorerWindowPassedProps} from '../Explorer';
import {EclipticFile, FileSystemDiscriminator, Folder} from '../../../apptypings/filesystem';
import * as hddIcon from '../../../assets/images/icons/029-harddisk.svg';
import * as folderIcon from '../../../assets/images/icons/026-folder-1.svg';
import * as fileIcon from '../../../assets/images/icons/062-file.svg';
import TileIcon from './TileIcon/TileIcon';
import HarddriveIcon from "./HarddriveIcon/HarddriveIcon";

export interface IExplorerContentProps {
    view: ExplorerView
    selectedDrive: string
    currentLocation: string[]
    selectedItems: string[]
    onDriveOpen: (drive: string) => void
    onOpenFolder: (name: string) => void
    onOpenFile: (name: string) => void
    onSelectItem: (name: string) => void
}
const explorerContent = (props: IExplorerContentProps & Partial<IExplorerWindowPassedProps>) => {
    const { drives, selectedDrive, currentLocation, selectedItems } = props;

    let folderContent: (EclipticFile | Folder)[] = currentLocation
        .reduce((contentArr: (EclipticFile | Folder)[], loc: string, i: number) => {
            const folder = contentArr.find(
                fileOrFolder => fileOrFolder.discriminator === FileSystemDiscriminator.FOLDER && fileOrFolder.name === loc
            );
            return folder.content
        }, drives[selectedDrive]);
    if (folderContent) {
        folderContent = folderContent.sort((a: (EclipticFile | Folder), b: (EclipticFile | Folder)) =>
                a.discriminator === b.discriminator ? a.name > b.name ? 1 : -1 : a.discriminator < b.discriminator ? 1 : -1
        );
    }


    // if (currentLocation.length) {
    //     folderContent = currentLocation.reduce((contentArr: (EclipticFile | Folder)[], loc: string, i: number) => {
    //         const folder = contentArr.find(
    //             fileOrFolder => fileOrFolder.discriminator === FileSystemDiscriminator.FOLDER && fileOrFolder.name === loc
    //         );
    //         return folder.content
    //     }, drives[selectedDrive])
    // }

    // if (selectedDrive) {
    //     drives[selectedDrive].sort((a, b) => {
    //         if (a.city === b.city) {
    //             // Price is only important when cities are the same
    //             return b.price - a.price;
    //         }
    //         return a.city > b.city ? 1 : -1;
    //     });
    // }
    const templates = {
        driveSelection: () => (
            <>
                {Object.keys(drives).map(driveLetter => (
                    <HarddriveIcon iconSrc={hddIcon}
                              name={`${driveLetter}:/`}
                              onDoubleClick={() => props.onDriveOpen(driveLetter)}
                              key={`drive-list-${driveLetter}`}/>
                ))}
            </>
        ),
        fileExplorer: () => (
            <>
                <div className={classes.fileExplorerWrapper}>
                    {folderContent.map(fileOrFolder => {
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
                                    onDoubleClick: () => props.onOpenFolder(fileOrFolder.name),
                                }
                            );
                        } else if (fileOrFolder.discriminator === FileSystemDiscriminator.FILE) {
                            return template(
                                fileIcon,
                                fileOrFolder.name,
                                {
                                    onDoubleClick: () => props.onOpenFile(fileOrFolder.name),
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
