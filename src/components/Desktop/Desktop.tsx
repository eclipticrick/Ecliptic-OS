import * as React from 'react';
import * as classes from './Desktop.module.scss';
import DesktopBackground from './DesktopBackground/DesktopBackground';
import DesktopIconGrid from './DesktopIconGrid/DesktopIconGrid';

const desktop = (props: {}) => (
    <div className={classes.root}>
        <DesktopBackground/>
        <DesktopIconGrid/>
    </div>
);

export default desktop;
