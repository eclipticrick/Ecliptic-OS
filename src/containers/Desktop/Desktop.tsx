import * as React from 'react';
import * as classes from './Desktop.module.scss';
import Background from './Background/Background';
import IconGrid from './IconGrid/IconGrid';

export class Desktop extends React.Component<{}, {}> {
    public render() {
        return (
            <div className={classes.root}>
                <Background/>
                <IconGrid/>
            </div>
        );
    }
}

export default Desktop;
