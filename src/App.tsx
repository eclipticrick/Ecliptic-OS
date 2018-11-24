import * as React from 'react';
import Temp from './containers/Temp/Temp';

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <Temp filename='BOOTMGR'/>
        );
    }
}

export default App;
