import {IApplication} from '../../../appdata/applications';
import {WindowInstanceType} from '../../../apptypings/window';

export interface ICalculatorPassedProps {
    openWindow: (application: IApplication, type?: WindowInstanceType) => void
}
