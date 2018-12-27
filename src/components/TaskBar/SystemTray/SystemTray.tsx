import * as React from 'react';
import * as classes from './SystemTray.module.scss';

export interface ISystemTrayState {
    time: Date
}

class SystemTray extends React.Component<{}, ISystemTrayState> {
    public state = {
        time: new Date()
    };

    private intervalID: any;

    public componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    public componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    public render() {
        return (
            <div className={classes.root}>
                <div className={classes.clock}>
                    {this.clockDisplay(this.state.time)}
                </div>
            </div>
        );
    }

    private tick() {
        this.setState({
            time: new Date()
        });
    }
    private clockDisplay(date: Date) {
        const makeTwoDigits = (nr: number) => {
            return nr.toString().length === 1 ? '0' + nr : nr
        };
        const HH = makeTwoDigits(date.getHours());
        const MM = makeTwoDigits(date.getMinutes());
        const SS = makeTwoDigits(date.getSeconds());

        return `${HH}:${MM}:${SS}`
    }
}

export default SystemTray;
