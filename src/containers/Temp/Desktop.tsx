import * as React from 'react';
import * as classes from './Desktop.module.scss';
import DesktopBackground from '../../components/Desktop/DesktopBackground';
import DesktopIconGrid from '../../components/Desktop/DesktopIconGrid';

export class Desktop extends React.Component<{}, {}> {
    public render() {
        return (
            <div className={classes.root}>
                <DesktopBackground/>
                <DesktopIconGrid/>
            </div>
        );
    }
}

export default Desktop;
