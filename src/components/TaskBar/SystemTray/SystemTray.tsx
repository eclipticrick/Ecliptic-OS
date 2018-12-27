import * as React from 'react';
import * as classes from './SystemTray.module.scss';

export interface ISystemTrayProps {
    temp?: any
}

const systemTray = (props: ISystemTrayProps) => {
    // const { temp } = props;

    return (
        <div className={classes.root}>
            SystemTray
        </div>
    );
};

export default systemTray;
