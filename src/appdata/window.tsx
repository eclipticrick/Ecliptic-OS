import {ApplicationId} from './applications';

export interface IWindowInstance {
    instanceId: number
    applicationId: ApplicationId
    maximized: boolean
    minimized: boolean
}
export interface IPopUpInstance {
    title: string
    type: 'info' | 'warning' | 'error'
    content: any // TODO: JSX or string
}
