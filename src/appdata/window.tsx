import {ApplicationId} from './applications';

export interface IWindowInstance {
    instanceId: number
    applicationId: ApplicationId
    maximized: boolean
    minimized: boolean
    selected: boolean
}
