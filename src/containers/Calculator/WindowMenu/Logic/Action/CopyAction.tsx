import {Action} from './Action';
import {Calculator} from '../../../Calculator';
import * as React from 'react';

export class CopyAction extends Action {
    public execute(environment: Calculator): void {
        environment.inputRef.current.select();
        document.execCommand('copy');
    }
}
