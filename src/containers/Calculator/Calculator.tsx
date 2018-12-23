import * as React from 'react';
import {IGenericWindowProps} from '../../components/Window/GenericWindow';
import Window from '../../components/Window/Base/Window';
import applications from '../../appdata/applications';
import WindowMenu from './WindowMenu/WindowMenu';

interface ICalculatorState {
    state: string
}

enum Clicked {
    ABOUT = 'ABOUT',
    VIEW_STANDARD = 'VIEW_STANDARD',
    VIEW_SCIENTIFIC = 'VIEW_SCIENTIFIC',
    HISTORY = 'HISTORY',
    COPY = 'COPY',
    PASTE = 'PASTE',
}
const menuTree = {
    Edit: {
        copy: Clicked.COPY,
        paste: Clicked.PASTE
    },
    View: {
        standard: Clicked.VIEW_STANDARD,
        scientific: Clicked.VIEW_SCIENTIFIC,
        history: Clicked.HISTORY,
    },
    Help: {
        about: Clicked.ABOUT
    }
};

export class Calculator extends React.Component<IGenericWindowProps, ICalculatorState> {
    public render() {
        const { applicationId, maximized, minimized, selected } = this.props;
        const { id, icon, window: {title, minWidth, minHeight, maximizable} } = applications.find(a => a.id === applicationId);
        return (
            <Window applicationId={id}
                    title={title}
                    minWidth={300}
                    minHeight={350}
                    iconSrc={icon.src}
                    minimized={minimized}
                    maximized={maximized}
                    maximizable={false}
                    selected={selected}>
                <WindowMenu menuTree={menuTree}/>
            </Window>
        );
    }
}

export default Calculator;
