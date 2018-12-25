import {ApplicationId} from './applications';

export interface IWindowInstance {
    applicationId: ApplicationId
    maximized: boolean
    minimized: boolean
}
