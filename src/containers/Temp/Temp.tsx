import * as React from 'react';
import * as classes from './Temp.module.scss';

export interface IPropsTest {
    filename: string
}

export class Temp extends React.Component<IPropsTest, {}> {
    public render() {
        const { filename } = this.props;

        return (
            <div className={classes.test}>
                <p>
                    Error loading operation system
                </p>
                <p>
                    {filename} is missing
                </p>
                <p>
                    Press Ctrl+Alt+Del to restart
                </p>
            </div>
        );
    }
}

export default Temp;
