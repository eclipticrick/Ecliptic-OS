import * as React from 'react';
import {IDefaultApplicationWindowProps} from '../../components/Window/DefaultApplicationWindow';
import Window from '../../components/Window/Base/Window';
import WindowMenu from './WindowMenu/WindowMenu';
import * as classes from './Calculator.module.scss';
import {Button, Grid, Tooltip} from '@material-ui/core';

interface ICalculatorState {
    entry: string
    store: string
    operator: string
    lastChar: number | string
    memory: string
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

export class Calculator extends React.Component<IDefaultApplicationWindowProps, ICalculatorState> {
    public state = {
        entry: '0',
        store: null as string,
        operator: null as string,
        lastChar: null as number | string,
        memory: null as string
    };

    public render() {
        const { windowInstance, application, selected } = this.props;

        // todo: implement
        const menuItemClickedHandler = (menuItem: Clicked) => {
            console.log(menuItem, 'clicked')
        };

        // todo: beautify code of this function and remove comments
        const handleButtonClick = (char: string | number) => {

            const trimNr = (nr: string) => {
                if (typeof nr.split('.')[1] !== 'undefined') {
                    while (nr.slice(-1) === '0') {
                        nr = nr.slice(0, -1);
                    }
                }
                if (nr.slice(-1) === '.') {
                    return nr.slice(0, -1);
                } else {
                    return nr
                }
            };

            const calculate = (nr1: string, operator: string, nr2: string): string => {
                nr1 = trimNr(nr1);
                nr2 = trimNr(nr2);
                if (operator === '/' && nr2 === '0') return 'Fatal Division by 0 error';
                if (operator === '/') return (Number(nr1) / Number(nr2)).toString();
                if (operator === '*') return (Number(nr1) * Number(nr2)).toString();
                if (operator === '+') return (Number(nr1) + Number(nr2)).toString();
                if (operator === '-') return (Number(nr1) - Number(nr2)).toString();
            };
            const calculatePercentage = (nr: string, operator: string, perc: string): string => {
                nr = trimNr(nr);
                perc = trimNr(perc);

                const amount = (Number(nr) * Number(perc)) / 100;
                if (operator === '/') return (Number(nr) / Number(amount)).toString();
                if (operator === '*') return (Number(nr) * Number(amount)).toString();
                if (operator === '+') return (Number(nr) + Number(amount)).toString();
                if (operator === '-') return (Number(nr) - Number(amount)).toString();
            };

            const operators = ['/', '+', '*', '-'];
            const calculations = ['=', 'sqrt', '1/x', '+/-', '%'];
            const memory = ['M+', 'MS', 'MR', 'MC'];

            const newState: Partial<ICalculatorState> = {};
            this.setState((state: ICalculatorState) => {

                if (typeof char === 'number') {

                    // if the entry is not equal to 0
                    if (state.entry !== '0') {

                        // replace the entry when the number contains an e+ / e-
                        if (state.entry.includes('e')) {
                            newState.entry = String(char)
                        } else if (state.entry.length >= 21) {
                            // else if: max length of 21 chars has been reached (including the dot)

                            // don't add anything to the entry
                            newState.entry = state.entry
                            // todo: play sound?
                        } else {
                            // else: add the number to the end of the entry
                            newState.entry = state.entry += char
                        }

                    } else {

                        // else: replace the 0 with the typed number
                        newState.entry = String(char)
                    }
                } else if (char === '.') {

                    // the max has not been reached yet
                    if (state.entry.length < 21) {

                        // if there is an NO e in the entry
                        if (!state.entry.includes('e')) {
                            // if there is not dot yet
                            if (!state.entry.includes('.')) {
                                // add it
                                newState.entry = state.entry += char

                            } else if (state.entry.includes('.')) {
                                // else if: there already is a dot and no e

                                // don't add another dot
                                newState.entry = state.entry
                                // todo: play sound?
                            }
                        } else {
                            // else: make it '0.'
                            newState.entry = '0' + char
                        }
                    } else {

                        // if the number contains an e
                        if (state.entry.includes('e')) {
                            // make it '0.'
                            newState.entry = '0' + char
                        } else {
                            // don't add another dot
                            newState.entry = state.entry
                            // todo: play sound?
                        }
                    }

                } else if (char === 'Backspace') {

                    // if there is only one char left in the entry
                    if (state.entry.length === 1) {

                        // change it to 0
                        newState.entry = '0'
                    } else if (!state.entry.includes('e')) {
                        // else if: the number does not contain an e+ / e-

                        // cut the last char off
                        newState.entry = state.entry.slice(0, -1)
                    }
                } else if (char === 'C') {
                    newState.store = null;
                    newState.entry = '0';
                    newState.operator = null;
                } else if (char === 'CE') {
                    newState.entry = '0';
                } else if (operators.includes(char)) {
                    newState.entry = '0';

                    // if no operator was specified before
                    if (!state.operator) {

                        // trim the entry & move it to the store
                        newState.store = trimNr(state.entry);
                    } else if (!operators.includes(String(state.lastChar))) {
                        // else if the previous charachter was NOT an operator

                        // calculate the new store with the [oldStore, operator, entry]
                        newState.store = calculate(state.store, state.operator, state.entry)
                    }

                    // put the operator in the state
                    newState.operator = char;
                } else if (calculations.includes(char)) {
                    if (char === '=') {
                        newState.operator = null;
                        newState.store = null;

                        // is it possible that operator === null? if so.. add another else if

                        if (!state.store) {
                            newState.entry = state.entry;
                        } else {
                            newState.entry = calculate(state.store, state.operator, state.entry);
                        }
                    } else if (char === 'sqrt') {
                        newState.entry = Math.sqrt(Number(trimNr(state.entry))).toString()
                    } else if (char === '1/x') {
                        newState.entry = Math.pow(Number(trimNr(state.entry)), -1).toString()
                    } else if (char === '+/-') {
                        newState.entry = String(
                            Number(trimNr(state.entry)) >= 0 ?
                                -Math.abs(Number(trimNr(state.entry))) :
                                Math.abs(Number(trimNr(state.entry)))
                        );
                    } else if (char === '%') {
                        newState.operator = null;
                        newState.store = null;
                        if (!state.store) {
                            newState.entry = state.entry;
                        } else {
                            newState.entry = calculatePercentage(state.store, state.operator, state.entry);
                        }
                    }
                } else if (memory.includes(char)) {
                    if (char === 'MC') {
                        newState.memory = null;
                    } else if (char === 'MR') {
                        newState.entry = state.memory;
                    } else if (char === 'MS') {
                        newState.memory = trimNr(state.entry);
                    } else if (char === 'M+') {
                        newState.memory = (Number(state.memory) * 2).toString();
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
            <Window windowInstance={windowInstance}
                    title={application.window.title}
                    minWidth={350}
                    minHeight={417}
                    iconSrc={application.icon.src}
                    maximizable={false}
                    selected={selected}>

                <WindowMenu menuTree={menuTree} onItemClicked={menuItemClickedHandler}/>

                <div className={classes.root}>

                    <Grid container>
                        <Grid item xs>
                            <div className={classes.inputContainer}>
                                <div className={classes.store}>{this.state.store || null} {this.state.operator}</div>
                                <input disabled value={this.state.entry.toString()}
                                       style={this.state.entry.length > 21 ? { fontSize: '14px' } : {}}/>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>

                            <Grid container direction='column'>
                                <Grid item>
                                    {this.state.memory ?
                                        <Tooltip title={this.state.memory} placement='right'>
                                            <Button className={classes.memory}
                                                    disableRipple
                                                    disableFocusRipple>
                                                M
                                            </Button>
                                        </Tooltip>
                                        :
                                        <Button className={classes.noMemory}
                                                disableRipple
                                                disableFocusRipple>
                                            <></>
                                        </Button>
                                    }
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
