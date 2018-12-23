import * as React from 'react';
import {IGenericWindowProps} from '../../components/Window/GenericWindow';
import Window from '../../components/Window/Base/Window';
import applications from '../../appdata/applications';
import WindowMenu from './WindowMenu/WindowMenu';
import * as classes from './Calculator.module.scss';
import {Button, Grid} from '@material-ui/core';

interface ICalculatorState {
    entry: number
    store: number

    operator: string

    prevChar: number | string
    currChar: number | string

    // sum: Array<number & string>
    // history: Array<Array<number & string>>
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
        copy: Clicked.COPY,
        paste: Clicked.PASTE
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
        currChar: null as number | string,
        prevChar: null as number | string,
        // sum: [] as Array<number & string>,
        // history: [] as Array<Array<number & string>>,
        memory: 0
    };

    public render() {
        const { applicationId, maximized, minimized, selected } = this.props;
        const { id, icon, window } = applications.find(a => a.id === applicationId);

        const handleButtonClick = (char: string | number) => {

            const calculate = (n1: number, o: string, n2: number): number => {
                if (o === '/' && n2 === 0) return +'NaN :)';
                if (o === '/') return n1 / n2;
                if (o === '*') return n1 * n2;
                if (o === '+') return n1 + n2;
                if (o === '-') return n1 - n2;
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
                    newState.prevChar = null;
                } else if (char === 'CE') {
                    newState.entry = 0;
                } else if (operators.includes(char)) {
                    newState.entry = 0;
                    if (!state.operator) {
                        newState.store = state.entry;
                    } else {
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
                        console.log('sqrt')
                    } else if (char === '1/x') {
                        console.log('1/x')
                    } else if (char === '+/-') {
                        newState.entry = state.entry >= 0 ? -Math.abs(state.entry) : Math.abs(state.entry);
                    } else if (char === '%') {
                        console.log('%')
                    }
                } else if (memory.includes(char)) {
                    if (char === 'MC') {
                        newState.entry = 0;
                        newState.memory = 0;
                    } else if (char === 'MR') {
                        newState.entry = state.memory;
                    } else if (char === 'MS') {
                        newState.memory = state.entry;
                    } else if (char === 'M+') {
                        newState.memory = state.memory * 2;
                    }
                }

                const x = {
                    ...state,
                    ...newState,
                    currChar: char,
                    prevChar: state.currChar,
                };
                console.log(x);
                return x
            });

        };

        return (
            <Window applicationId={id}
                    title={window.title}
                    minWidth={350}
                    minHeight={417}
                    iconSrc={icon.src}
                    minimized={minimized}
                    maximized={maximized}
                    maximizable={false}
                    selected={selected}>
                <WindowMenu menuTree={menuTree}/>
                <div className={classes.root}>

                    <Grid container>
                        <Grid item xs>
                            <input disabled value={this.state.entry.toString()}/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>

                            <Grid container direction='column'>
                                <Grid item>
                                    <Button disabled>
                                        <></>
                                    </Button>
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
