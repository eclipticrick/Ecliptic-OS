import Actions from '../actionTypes';
import {User} from "../../apptypings/user";

export const attachDrive = (drive: string) => ({
    type: Actions.STORAGE_____ATTACH_DRIVE,
    payload: { drive }
});
export const detachDrive = (drive: string) => ({
    type: Actions.STORAGE_____DETACH_DRIVE,
    payload: { drive }
});
export const createFolder = (drive: string, location: string[], name: string) => ({
    type: Actions.STORAGE_____CREATE_FOLDER,
    payload: { drive, location, name }
});
export const removeFolder = (drive: string, location: string[], name: string) => ({
    type: Actions.STORAGE_____REMOVE_FOLDER,
    payload: { drive, location, name }
});
export const createFile = (drive: string, location: string[], name: string, user: User) => ({
    type: Actions.STORAGE_____CREATE_FILE,
    payload: { drive, location, name, user }
});
export const removeFile = (drive: string, location: string[], name: string, user: User) => ({
    type: Actions.STORAGE_____REMOVE_FILE,
    payload: { drive, location, name, user }
});
export const editFile = () => ({ // todo
    type: Actions.STORAGE_____EDIT_FILE
});
export const revertFile = () => ({ // todo
    type: Actions.STORAGE_____REVERT_FILE
});
export const lockFile = () => ({ // todo
    type: Actions.STORAGE_____LOCK_FILE
});
export const unlockFile = () => ({ // todo
    type: Actions.STORAGE_____UNLOCK_FILE
});
export const setFilePermissions = () => ({ // todo
    type: Actions.STORAGE_____SET_FILE_PERMISSIONS
});
export const setError = () => ({ // todo
    type: Actions.STORAGE_____SET_ERROR
});
export const unsetError = () => ({ // todo
    type: Actions.STORAGE_____UNSET_ERROR
});