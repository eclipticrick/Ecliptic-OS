import {Calculator} from '../../Calculator';
import {Clicked} from '../../Enum/Clicked';
import {Action} from './Action/Action';
import {AboutAction} from './Action/AboutAction';
import {CopyAction} from './Action/CopyAction';

export class MenuActionHandler {
    private actions: Map<Clicked, Action> = new Map<Clicked, Action>();

    constructor() {
        this.actions
            .set(Clicked.COPY, new CopyAction())
            .set(Clicked.ABOUT, new AboutAction());
    }

    public handleAction(calculator: Calculator, clickedItem: Clicked): void {
        if (this.actions.has(clickedItem)) {
            this.actions.get(clickedItem).execute(calculator);
        } else {
            console.warn(`Action with name '${String(clickedItem)}' does not exist`);
        }
    }
}
