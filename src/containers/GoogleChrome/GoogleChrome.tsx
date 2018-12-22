import * as React from 'react';
import * as classes from './GoogleChrome.module.scss';
import Window from '../../components/Window/Window';
import applications from '../../appdata/applications';

export class GoogleChrome extends React.Component<{}, {}> {
    public render() {
        const { name, iconSrc, minWidth, minHeight } = applications.find(a => a.id === 'chrome');
        return (
            <Window title={name} minWidth={minWidth} minHeight={minHeight} iconSrc={iconSrc}>
                <div className={classes.root}>
                    chrome
                </div>
            </Window>
        );
    }
}

export default GoogleChrome;
