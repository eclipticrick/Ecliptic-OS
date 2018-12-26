import {ApplicationId} from './applications';

export interface IWindowInstance {
    instanceId: number
    applicationId: ApplicationId
    maximized: boolean
    minimized: boolean
}

export enum PopupType {
    INFO = 'INFO',
    HELP = 'HELP',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export interface IPopupInstance {
    title: string
    type: PopupType
    children: any // TODO: JSX or string
}
