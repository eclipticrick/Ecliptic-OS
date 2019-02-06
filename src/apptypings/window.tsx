import {ApplicationId, IApplication} from '../appdata/applications';

export enum WindowInstanceType {
    APPLICATION = 'APPLICATION',
    POPUP = 'POPUP',
}
export interface IWindowInstance {
    instanceId: number
    // applicationId: ApplicationId
    maximized: boolean
    minimized: boolean
    type: WindowInstanceType
    application: IApplication // | IPopupInstance
}

// export enum PopupType {
//     INFO = 'INFO',
//     HELP = 'HELP',
//     WARNING = 'WARNING',
//     ERROR = 'ERROR'
// }
//
// export interface IPopupInstance {
//     title: string
//     type: PopupType
//     children: any // TODO: JSX or string
// }