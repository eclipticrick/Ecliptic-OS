import {IReducerStorage} from './index';
import {IAction} from '../../actionTypes';
import {
    defaultFile,
    defaultFolder,
    EclipticFile,
    EclipticFilePermission,
    FileSystemDiscriminator,
    Folder
} from "../../../apptypings/filesystem";

/***********
 * helpers *
 ***********/
const isFolder = (object: any): object is Folder => 'discriminator ' in object && object.discriminator === FileSystemDiscriminator.FOLDER;
const isFile = (object: any): object is Folder => 'discriminator ' in object && object.discriminator === FileSystemDiscriminator.FILE;
const hasProtectedFolders = (folders: (Folder | EclipticFile)[]): string => {
    return folders.reduce((protectedFolder, fileOrFolder) => {
        if (protectedFolder) return protectedFolder;

        if (isFolder(fileOrFolder) && fileOrFolder.content) {
            if (fileOrFolder.protected) return fileOrFolder.name;
            return this.hasProtectedFolders(fileOrFolder.content);
        }
    }, null);
};
const folderExists = (drive: (Folder | EclipticFile)[], location: string[]): boolean => {
    return drive.reduce((found, fileOrFolder) => {
        if (isFolder(fileOrFolder) && fileOrFolder.name === location[0]) {
            if (location.length > 1) {
                location.shift();
                return this.folderExists(fileOrFolder.content, location);
            } else {
                return true;
            }
        }
    }, false);
};
const getFileFromFolder = (fileName: string, folder: Folder): EclipticFile => {
    return folder.content.find(f => isFile(f) && f.name === fileName) as EclipticFile
};
const stringContainsSpecialCharacters = (str: string, options: { allowDot?: boolean, allowSpace?: boolean } = {}): boolean => {
    let { allowDot, allowSpace } = options;

    if (typeof allowDot === 'undefined') allowDot = false;
    if (typeof allowSpace === 'undefined') allowSpace = true;

    if (allowDot && allowSpace)        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/.test(str);
    else if (allowDot && !allowSpace)  return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/.test(str);
    else if (!allowDot && allowSpace)  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
    else if (!allowDot && !allowSpace) return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
    return false;
};
const locationArrayToString = (location: string[]) => location.map((folder: string, i: number) => folder + (i !== location.length ? '/' : ''));
const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const getFolderStructure = (root: (Folder | EclipticFile)[], location: string[]): Folder[] => {
    const folders = [] as Folder[];
    location.forEach((locationPart: string) => {
        const folderContentToSearchIn = !folders.length ? root : folders[folders.length - 1] ? folders[folders.length - 1].content : null;
        if (!folderContentToSearchIn) {
            folders.push(null)
        } else {
            const folder: Folder = folderContentToSearchIn.find(f => isFolder(f) && f.name === locationPart) as Folder;
            folders.push(folder)
        }
    });
    return folders;

    // return location.reduce((accumulator: (Folder | EclipticFile)[], locationPart: string) => {
    //     if (!accumulator) return null;
    //     const folder: Folder = accumulator.find(f => isFolder(f) && f.name === locationPart) as Folder;
    //     if (!folder) return null;
    //     return folder.content;
    // }, root);
};
/************
 * /helpers *
 ************/

export default {
    attachDrive: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        let { drive } = action.payload;
        let error: string = null;

        if (drive in oldState.drives) {
            error = `Drive '${drive}:/' already exists!`
        } else if (drive.length !== 1) {
            error = `'${drive}' is not a valid drive letter!`
        }

        if (!error) {
            return {
                ...oldState,
                drives: {
                    ...oldState.drives,
                    [drive]: []
                }
            };
        } else {
            return { ...oldState, error }
        }
    },
    detachDrive: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        let { drive } = action.payload;
        let error: string = null;

        if (drive !in oldState.drives) {
            error = `Drive '${drive}:/' does not exist!`
        } else if (hasProtectedFolders(oldState.drives[drive])) {
            error = `Drive '${drive}:/' can not be detached because it contains system folders!`
        }

        if (!error) {
            const newState = {
                ...oldState,
                detachedDrives: {
                    ...oldState.detachedDrives,
                    [drive]: oldState.drives[drive]
                }
            };
            delete newState.drives[drive];

            return newState;
        } else {
            return { ...oldState, error }
        }
    },
    createFolder: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        let { drive, location, name } = action.payload;
        let error: string = null;
        let driveContent = null;

        if (!name.trim()) {
            error = `The folder name can't be empty!`
        } else if (stringContainsSpecialCharacters(name)) {
            error = `The folder name can't contain any special characters!`
        } else if (drive in oldState.drives) {
            error = `Drive '${drive}:/' does not exist!`
        } else if (!folderExists(oldState.drives[drive], location)) {
            error = `Folder '${drive}:/${locationArrayToString(location)}' does not exist!`
        } else if (folderExists(oldState.drives[drive], [...location, name])) {
            error = `Folder '${name}' already exists in '${drive}:/${locationArrayToString(location)}/${name}'!`
        } else {
            driveContent = deepClone(oldState.drives[drive]);
            const folderStructure = getFolderStructure(driveContent, location);
            const folderContent = folderStructure[folderStructure.length - 1].content;

            folderContent.push({
                ...defaultFolder,
                name: name.trim()
            });
        }

        if (!error) {
            return {
                ...oldState,
                drives: {
                    ...oldState.drives,
                    [drive]: driveContent
                }
            }
        } else {
            return { ...oldState, error }
        }
    },
    removeFolder: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        let { drive, location, name } = action.payload;
        let error: string = null;
        let driveContent = null;

        if (drive in oldState.drives) {
            error = `Drive '${drive}:/' does not exist!`
        } else if (!folderExists(oldState.drives[drive], location)) {
            error = `Folder '${drive}:/${locationArrayToString(location)}' does not exist!`
        } else {
            const driveContent = deepClone(oldState.drives[drive]);
            const folderStructure = getFolderStructure(driveContent, location);
            const parentFolder = folderStructure[folderStructure.length - 1];
            const folder = parentFolder.content.find(f => isFolder(f) && f.name === name) as Folder;
            if (folder.content && hasProtectedFolders(folder.content)){
                error = `Folder '${drive}:/${locationArrayToString(location)}' could not be removed because it contains protected files!`
             } else {
                parentFolder.content.splice(parentFolder.content.indexOf(folder), 1);
             }
        }

        if (!error) {
            return {
                ...oldState,
                drives: {
                    ...oldState.drives,
                    [drive]: driveContent
                }
            }
        } else {
            return { ...oldState, error }
        }
    },
    createFile: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        let { drive, location, name, user } = action.payload; // TODO: make User object
        let error: string = null;
        let driveContent = null;

        if (!name.trim()) {
            error = `The folder name can't be empty!`
        } else if (stringContainsSpecialCharacters(name)) {
            error = `The folder name can't contain any special characters!`
        } else if (drive in oldState.drives) {
            error = `Drive '${drive}:/' does not exist!`
        } else if (!folderExists(oldState.drives[drive], location)) {
            error = `Folder '${drive}:/${locationArrayToString(location)}' does not exist!`
        } else {
            driveContent = deepClone(oldState.drives[drive]);
            const folderStructure = getFolderStructure(driveContent, location);
            const folder = folderStructure[folderStructure.length - 1];
            if (getFileFromFolder(name, folder)) {
                error = `There is already a file with the same name in this location!`
            } else {
                folder.content.push({
                    ...defaultFile, name, owner: user
                })
            }
        }

        if (!error) {
            return {
                ...oldState,
                drives: {
                    ...oldState.drives,
                    [drive]: driveContent
                }
            }
        } else {
            return { ...oldState, error }
        }
    },
    removeFile: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        let { drive, location, name, user } = action.payload;
        let error: string = null;
        let driveContent = null;

        if (drive in oldState.drives) {
            error = `Drive '${drive}:/' does not exist!`
        } else if (!folderExists(oldState.drives[drive], location)) {
            error = `Folder '${drive}:/${locationArrayToString(location)}' does not exist!`
        } else {
            driveContent = deepClone(oldState.drives[drive]);
            const folderStructure = getFolderStructure(driveContent, location);
            const parentFolder = folderStructure[folderStructure.length - 1];
            const file: EclipticFile = getFileFromFolder(name, parentFolder);
            if (!file) {
                error = `The file you are trying to delete does not exist!`
            } else {
                const isFileOwner = file.owner.username === user.username;
                const isInFileGroup: boolean = user.groups.reduce((isInGroup: boolean, group: string) => {
                    if (isInGroup) return isInGroup;
                    else return file.owner.groups.includes(group)
                }, false);
                const canDelete = (permissionType: 'a' | 'g' | 'u') => file.permissions[permissionType].includes(EclipticFilePermission.WRITE);
                if (!isFileOwner && (!isInFileGroup && !canDelete('a')) || (isInFileGroup && !canDelete('g'))) {
                    error = `You do not have the right permissions to delete this file!`;
                } else if (isFileOwner && !canDelete('u')) {
                    error = `You have the file permissions set to read-only, you can change this in the context menu!`;
                } else {
                    parentFolder.content.splice(parentFolder.content.indexOf(file), 1);
                }
            }
        }

        if (!error) {
            return {
                ...oldState,
                drives: {
                    ...oldState.drives,
                    [drive]: driveContent
                }
            }
        } else {
            return { ...oldState, error }
        }
    },
    editFile: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    },
    revertFile: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    },
    lockFile: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    },
    unlockFile: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    },
    setFilePermissions: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    },
    setError: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    },
    unsetError: (oldState: IReducerStorage, action: IAction): IReducerStorage => {
        return {
            ...oldState
        };
    }
}
