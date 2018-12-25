import * as React from 'react';
import {IGenericWindowProps} from '../../components/Window/GenericWindow';
import Window from '../../components/Window/Base/Window';
import WindowMenu from './WindowMenu/WindowMenu';
import * as classes from './Calculator.module.scss';
import {Button, Grid, Tooltip} from '@material-ui/core';

interface ICalculatorState {
    entry: number
    store: number
    operator: string
    lastChar: number | string
    memory: number
}

enum Clicked {
    ABOUT = 'ABOUT',
    HISTORY = 'HISTORY',
    COPY = 'COPY',
    PASTE = 'PASTE',
}
const menuTree = {
    Edit: {
        copy: [Clicked.COPY, 'CTRL + C'],
        paste: [Clicked.PASTE, 'CTRL + V']
    },
    View: {
        history: Clicked.HISTORY,
    },
    Help: {
        about: Clicked.ABOUT
    }
};

export class Calculator extends React.Component<IGenericWindowProps, ICalculatorState> {
    public state = {
        entry: 0,
        store: 0,
        operator: null as string,
        lastChar: null as number | string,
        memory: 0
    };

    public render() {
        const { windowInstance, application, selected } = this.props;

        const menuItemClickedHandler = (menuItem: Clicked) => {
            console.log(menuItem, 'clicked')
        };

        const handleButtonClick = (char: string | number) => {

            const calculate = (n1: number, o: string, n2: number): number => {
                if (o === '/' && n2 === 0) return +'NaN :)';
                if (o === '/') return n1 / n2;
                if (o === '*') return n1 * n2;
                if (o === '+') return n1 + n2;
                if (o === '-') return n1 - n2;
                else return -1 // should never happen
            };
            const calculatePercentage = (nr: number, o: string, perc: number): number => {
                const amount = (nr * perc) / 100;
                // if (o === '/' && n2 === 0) return +'NaN :)';
                if (o === '/') return nr / amount;
                if (o === '*') return nr * amount;
                if (o === '+') return nr + amount;
                if (o === '-') return nr - amount;
                else return -1 // should never happen

            };

            const operators = ['/', '+', '*', '-'];
            const calculations = ['=', 'sqrt', '1/x', '+/-', '%'];
            const memory = ['M+', 'MS', 'MR', 'MC'];
            console.log(char);

            const newState: Partial<ICalculatorState> = {};
            this.setState((state: ICalculatorState) => {

                if (typeof char === 'number') {
                    newState.entry = (state.entry * 10) + char;
                } else if (char === '.') {
                    console.log('is .');
                } else if (char === 'Backspace') {
                    newState.entry = (state.entry - (state.entry % 10)) / 10;
                } else if (char === 'C') {
                    newState.store = 0;
                    newState.entry = 0;
                    newState.operator = null;
                } else if (char === 'CE') {
                    newState.entry = 0;
                } else if (operators.includes(char)) {
                    newState.entry = 0;
                    if (!state.operator) {
                        newState.store = state.entry;
                    } else if (!operators.includes(String(state.lastChar))) {
                        newState.store = calculate(state.store, state.operator, state.entry)
                    }
                    newState.operator = char;
                } else if (calculations.includes(char)) {
                    if (char === '=') {
                        newState.operator = null;
                        newState.store = 0;
                        if (!state.store) {
                            newState.entry = state.entry;
                        } else {
                            newState.entry = calculate(state.store, state.operator, state.entry);
                        }
                    } else if (char === 'sqrt') {
                        newState.entry = Math.sqrt(state.entry)
                    } else if (char === '1/x') {
                        newState.entry = Math.pow(state.entry, -1)
                    } else if (char === '+/-') {
                        newState.entry = state.entry >= 0 ? -Math.abs(state.entry) : Math.abs(state.entry);
                    } else if (char === '%') {
                        newState.operator = null;
                        newState.store = 0;
                        if (!state.store) {
                            newState.entry = state.entry;
                        } else {
                            newState.entry = calculatePercentage(state.store, state.operator, state.entry);
                        }
                    }
                } else if (memory.includes(char)) {
                    if (char === 'MC') {
                        newState.memory = 0;
                    } else if (char === 'MR') {
                        newState.entry = state.memory;
                    } else if (char === 'MS') {
                        newState.memory = state.entry;
                    } else if (char === 'M+') {
                        newState.memory = state.memory * 2;
                    }
                }

                return {
                    ...state,
                    ...newState,
                    lastChar: char
                }
            });

        };

        return (
            <Window instanceId={windowInstance.instanceId}
                    applicationId={application.id}
                    title={application.window.title}
                    minWidth={350}
                    minHeight={417}
                    iconSrc={application.icon.src}
                    minimized={windowInstance.minimized}
                    maximized={windowInstance.maximized}
                    maximizable={false}
                    selected={selected}>

                <WindowMenu menuTree={menuTree} onItemClicked={menuItemClickedHandler}/>

                <div className={classes.root}>

                    <Grid container>
                        <Grid item xs>
                            <div className={classes.inputContainer}>
                                <div className={classes.store}>{this.state.store || null} {this.state.operator}</div>
                                <input disabled value={this.state.entry.toString()}/>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>

                            <Grid container direction='column'>
                                <Grid item>
                                    <Tooltip title={this.state.memory} placement='right'>
                                        <Button className={classes.memory}
                                                disabled={!this.state.memory}
                                                style={this.state.memory ? {cursor: 'help'} : {}}
                                                disableRipple
                                                disableFocusRipple>
                                            {this.state.memory ? 'M' : <></>}
                                        </Button>
                                    </Tooltip>

                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleButtonClick('MC')} color='secondary'>
                                        MC
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleButtonClick('MR')} color='secondary'>
                                        MR
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleButtonClick('MS')} color='secondary'>
                                        MS
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleButtonClick('M+')} color='secondary'>
                                        M+
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={10}>

                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('Backspace')} color='secondary'>
                                        Backspace
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('CE')} color='secondary'>
                                        CE
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('C')} color='secondary'>
                                        C
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(7)} color='primary' variant='outlined'>
                                        7
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(8)} color='primary' variant='outlined'>
                                        8
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(9)} color='primary' variant='outlined'>
                                        9
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('/')} color='secondary'>
                                        /
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('sqrt')} color='primary'>
                                        sqrt
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(4)} color='primary' variant='outlined'>
                                        4
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(5)} color='primary' variant='outlined'>
                                        5
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(6)} color='primary' variant='outlined'>
                                        6
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('*')} color='secondary'>
                                        *
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('%')} color='primary'>
                                        %
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(1)} color='primary' variant='outlined'>
                                        1
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(2)} color='primary' variant='outlined'>
                                        2
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(3)} color='primary' variant='outlined'>
                                        3
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('-')} color='secondary'>
                                        -
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('1/x')} color='primary'>
                                        1/x
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('+/-')} color='primary'>
                                        +/-
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick(0)} color='primary' variant='outlined'>
                                        0
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('.')} color='primary'>
                                        .
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('+')} color='secondary'>
                                        +
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => handleButtonClick('=')} color='secondary' variant='outlined'>
                                        =
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </div>
            </Window>
        );
    }
}

export default Calculator;
