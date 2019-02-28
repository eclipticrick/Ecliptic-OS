import Actions, {IAction} from '../../actionTypes';
import functions from './functions';
import {defaultFile, defaultFolder, EclipticFile, Folder} from '../../../apptypings/filesystem';
import * as documentsIconSrc from '../../../assets/images/icons/025-folder.svg';

export interface IReducerStorage {
    drives: {
        [drive: string]: (Folder | EclipticFile)[]
    },
    detachedDrives: {
        [drive: string]: (Folder | EclipticFile)[]
    }
    error?: string
}

const initialState: IReducerStorage = {
    drives: {
        C: [
            { ...defaultFolder, protected: true, name: 'desktop', customIcon: documentsIconSrc },
            { ...defaultFolder, protected: true, name: 'documents', customIcon: documentsIconSrc,
                content: [
                    { ...defaultFolder, name: 'aaa',
                        content: [
                            { ...defaultFolder, name: 'bbb',
                                content: [
                                    { ...defaultFolder, name: 'ccc',
                                        content: [
                                            { ...defaultFolder, name: 'ddd',
                                                content: [
                                                    { ...defaultFolder, name: 'eee' },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    { ...defaultFolder, name: 'zzz' },
                    { ...defaultFile, name: 'aaa.txt' },
                    { ...defaultFile, name: 'zzz.txt' },
                ]
            },
            { ...defaultFolder, protected: true, name: 'downloads', customIcon: documentsIconSrc },
            { ...defaultFolder, protected: true, name: 'pictures', customIcon: documentsIconSrc },
            { ...defaultFolder, protected: true, name: 'videos', customIcon: documentsIconSrc },
            { ...defaultFolder, protected: true, name: 'shared', customIcon: documentsIconSrc },
            { ...defaultFolder, name: 'other' },
            { ...defaultFile, name: 'myFile.txt' },
            { ...defaultFile, name: 'myDrawing.doodle' },
            { ...defaultFile, name: 'myDocument.writer' },
        ],
        D: []
    },
    detachedDrives: {}
};

const REDUCER = ( state: IReducerStorage = initialState, action: IAction & any ) => {
    switch ( action.type ) {
        case Actions.STORAGE_____ATTACH_DRIVE         : return functions.attachDrive(state, action);
        case Actions.STORAGE_____DETACH_DRIVE         : return functions.detachDrive(state, action);
        case Actions.STORAGE_____CREATE_FOLDER        : return functions.createFolder(state, action);
        case Actions.STORAGE_____REMOVE_FOLDER        : return functions.removeFolder(state, action);
        case Actions.STORAGE_____CREATE_FILE          : return functions.createFile(state, action);
        case Actions.STORAGE_____REMOVE_FILE          : return functions.removeFile(state, action);
        case Actions.STORAGE_____EDIT_FILE            : return functions.editFile(state, action);
        case Actions.STORAGE_____REVERT_FILE          : return functions.revertFile(state, action);
        case Actions.STORAGE_____LOCK_FILE            : return functions.lockFile(state, action);
        case Actions.STORAGE_____UNLOCK_FILE          : return functions.unlockFile(state, action);
        case Actions.STORAGE_____SET_FILE_PERMISSIONS : return functions.setFilePermissions(state, action);
        case Actions.STORAGE_____SET_ERROR            : return functions.setError(state, action);
        case Actions.STORAGE_____UNSET_ERROR          : return functions.unsetError(state, action);
    }
    return state;
};

export default REDUCER;
