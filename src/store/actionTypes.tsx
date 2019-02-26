
export interface IAction {
    type: Actions
    payload?: any
}

enum Actions {

    TASKBAR_____SET_HEIGHT = 'TASKBAR_____SET_HEIGHT',
    TASKBAR_____SET_QUICK_ACCESS_WIDTH = 'TASKBAR_____SET_QUICK_ACCESS_WIDTH',
    TASKBAR_____QUICKACCESS_ADD_SHORTCUT = 'TASKBAR_____QUICKACCESS_ADD_SHORTCUT',
    TASKBAR_____QUICKACCESS_REMOVE_SHORTCUT = 'TASKBAR_____QUICKACCESS_REMOVE_SHORTCUT',

    USER_____LOGIN = 'USER_____LOGIN',

    STARTMENU_____OPEN = 'STARTMENU_____OPEN',
    STARTMENU_____CLOSE = 'STARTMENU_____CLOSE',
    STARTMENU_____ADD_RECENT_APPLICATION = 'STARTMENU_____ADD_RECENT_APPLICATION',
    STARTMENU_____PIN_APPLICATION = 'STARTMENU_____PIN_APPLICATION',
    STARTMENU_____UNPIN_APPLICATION = 'STARTMENU_____UNPIN_APPLICATION',

    WINDOWS_____OPEN = 'WINDOWS_____OPEN',
    WINDOWS_____CLOSE = 'WINDOWS_____CLOSE',
    WINDOWS_____SELECT = 'WINDOWS_____SELECT',
    WINDOWS_____MINIMIZE = 'WINDOWS_____MINIMIZE',
    WINDOWS_____MAXIMIZE = 'WINDOWS_____MAXIMIZE',
    WINDOWS_____NORMALIZE = 'WINDOWS_____NORMALIZE',

    DESKTOP_____ADD_SHORTCUT = 'DESKTOP_____ADD_SHORTCUT',
    DESKTOP_____REMOVE_SHORTCUT = 'DESKTOP_____REMOVE_SHORTCUT',
    DESKTOP_____TOGGLE_BACKGROUND = 'DESKTOP_____TOGGLE_BACKGROUND',

    STORAGE_____ATTACH_DRIVE = 'STORAGE_____ATTACH_DRIVE',
    STORAGE_____DETACH_DRIVE = 'STORAGE_____DETACH_DRIVE',
    STORAGE_____CREATE_FOLDER = 'STORAGE_____CREATE_FOLDER',
    STORAGE_____REMOVE_FOLDER = 'STORAGE_____REMOVE_FOLDER',
    STORAGE_____CREATE_FILE = 'STORAGE_____CREATE_FILE',
    STORAGE_____REMOVE_FILE = 'STORAGE_____REMOVE_FILE',
    STORAGE_____EDIT_FILE = 'STORAGE_____EDIT_FILE',
    STORAGE_____REVERT_FILE = 'STORAGE_____REVERT_FILE',
    STORAGE_____LOCK_FILE = 'STORAGE_____LOCK_FILE',
    STORAGE_____UNLOCK_FILE = 'STORAGE_____UNLOCK_FILE',
    STORAGE_____SET_FILE_PERMISSIONS = 'STORAGE_____SET_FILE_PERMISSIONS',
    STORAGE_____SET_ERROR = 'STORAGE_____SET_ERROR',
    STORAGE_____UNSET_ERROR = 'STORAGE_____UNSET_ERROR'
}

export default Actions;
