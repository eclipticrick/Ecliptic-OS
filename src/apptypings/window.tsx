import {IApplication} from '../appdata/applications';

export enum WindowInstanceType {
    APPLICATION = 'APPLICATION',
    POPUP = 'POPUP',
}
export interface IWindowInstance {
    instanceId: number
    maximized: boolean
    minimized: boolean
    type: WindowInstanceType
    application: IApplication
}