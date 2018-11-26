import * as React from 'react';
import OperatingSystem from './components/OperatingSystem/OperatingSystem';

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <OperatingSystem />
        );
    }
}

export default App;
