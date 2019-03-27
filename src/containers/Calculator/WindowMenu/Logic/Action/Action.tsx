import {Calculator} from '../../../Calculator';

export abstract class Action {
    public abstract execute(environment: Calculator): void;
}
