import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';
import InternetExplorer from '../../containers/InternetExplorer/InternetExplorer';

export class Desktop extends React.Component<{}, {}> {
    public render() {
        return (
            <div className={classes.root}>
                <Background/>
                <IconGrid/>
                <InternetExplorer/>
            </div>
        );
    }
}

export default Desktop;
