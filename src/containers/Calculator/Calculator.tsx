import * as React from 'react';
import {IDefaultApplicationWindowProps} from '../../components/Window/DefaultApplicationWindow';
import Window, {IWindowProps} from '../../components/Window/Base/Window';
import WindowMenu from './WindowMenu/WindowMenu';
import * as classes from './Calculator.module.scss';
import {Button, Grid, Tooltip} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {IPopUpInstance} from '../../appdata/window';

interface ICalculatorState {
    entry: string
    store: string
    operator: string
    lastChar: number | string
    memory: string
}
interface ICalculatorPassedProps {
    openPopup: (popup: IPopUpInstance) => any // TODO: generalize
}
enum Clicked {
    COPY = 'COPY',
    ABOUT = 'ABOUT'
}
const menuTree = {
    Edit: {
        copy: [Clicked.COPY, 'CTRL + C']
    },
    Help: {
        about: Clicked.ABOUT
    }
};

export class Calculator extends React.Component<IDefaultApplicationWindowProps & ICalculatorPassedProps, ICalculatorState> {
    public state = {
        entry: '0',
        store: null as string,
        operator: null as string,
        lastChar: null as number | string,
        memory: null as string
    };
    private inputRef: any = React.createRef();

    public render() {
        const { windowInstance, application, selected } = this.props;

        const menuItemClickedHandler = (menuItem: Clicked) => {
            if (menuItem === Clicked.COPY) {
                this.inputRef.current.select();
                document.execCommand('copy');
            } else if (menuItem === Clicked.ABOUT) {
                this.props.openPopup({
                    type: 'info',
                    title: 'About Calculator',
                    content: (<>
                        Version 0.0.1<br/>
                        © Wesley Veenendaal
                    </>)
                })
            }
        };

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
            const defaultCalculation = (nr1: number, operator: string, nr2: number): number => {
                if (operator === '/') return nr1 / nr2;
                if (operator === '*') return nr1 * nr2;
                if (operator === '+') return nr1 + nr2;
                if (operator === '-') return nr1 - nr2;
            };
            const calculate = (nr1: string, operator: string, nr2: string): string => {
                nr1 = trimNr(nr1);
                nr2 = trimNr(nr2);
                if (operator === '/' && nr2 === '0') return 'Fatal Division by 0 error';
                return defaultCalculation(Number(nr1), operator, Number(nr2)).toString();
            };
            const calculatePercentage = (nr: string, operator: string, perc: string): string => {
                nr = trimNr(nr);
                perc = trimNr(perc);
                const amount = (Number(nr) * Number(perc)) / 100;
                return defaultCalculation(Number(nr), operator, amount).toString();
            };

            const operators = ['/', '+', '*', '-'];
            const calculations = ['=', 'sqrt', '1/x', '+/-', '%'];
            const memory = ['M+', 'MS', 'MR', 'MC'];

            const isScientificNotation = (nr: string) => nr.includes('e');
            const maxLengthReached = (nr: string) => nr.length >= 21;

            const newState: Partial<ICalculatorState> = {};
            this.setState((state: ICalculatorState) => {

                if (typeof char === 'number') {
                    if (state.entry === '0') {
                        newState.entry = char.toString()
                    } else {
                        if (isScientificNotation(state.entry)) {
                            newState.entry = char.toString()
                        } else if (maxLengthReached(state.entry)) {
                            newState.entry = state.entry
                            // todo: play sound?
                        } else {
                            newState.entry = state.entry += char
                        }
                    }
                } else if (char === '.') {
                    if (maxLengthReached(state.entry)) {
                        if (isScientificNotation(state.entry)) {
                            newState.entry = '0' + char
                        } else {
                            newState.entry = state.entry
                            // todo: play sound?
                        }
                    } else {
                        if (isScientificNotation(state.entry)) {
                            newState.entry = '0' + char
                        } else if (state.entry.includes('.')) {
                            newState.entry = state.entry
                            // todo: play sound?
                        } else {
                            newState.entry = state.entry += char
                        }
                    }
                } else if (char === 'Backspace') {
                    if (state.entry.length === 1) {
                        newState.entry = '0'
                    } else if (!isScientificNotation(state.entry)) {
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
                    newState.operator = char;
                    if (!state.operator) {
                        newState.store = trimNr(state.entry);
                    } else if (!operators.includes(String(state.lastChar))) {
                        newState.store = calculate(state.store, state.operator, state.entry)
                    }
                } else if (calculations.includes(char)) {
                    if (char === '=') {
                        newState.operator = null;
                        newState.store = null;
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
                        newState.entry = (
                            Number(trimNr(state.entry)) >= 0 ?
                                -Math.abs(Number(trimNr(state.entry))) :
                                Math.abs(Number(trimNr(state.entry)))
                        ).toString();
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
                                <input readOnly
                                       ref={this.inputRef}
                                       value={this.state.entry.toString()}
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

const mapDispatchToProps = (dispatch: any): Partial<ICalculatorPassedProps> => ({
    openPopup: (popup: IPopUpInstance) => dispatch(actions.openPopup(popup))
});
export default connect<Partial<ICalculatorPassedProps>, Partial<ICalculatorPassedProps>, IWindowProps>(
    null, mapDispatchToProps
)(Calculator);
