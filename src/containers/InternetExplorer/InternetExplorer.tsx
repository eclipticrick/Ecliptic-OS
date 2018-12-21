import * as React from 'react';
import * as classes from './InternetExplorer.module.scss';
import Window from '../../components/Window/Window';

export class InternetExplorer extends React.Component<{}, {}> {
    public render() {
        return (
            <Window title={'Interwebz Explorer'}>
                <div className={classes.root}>
                    Hello World
                </div>
            </Window>
        );
    }
}

export default InternetExplorer;
