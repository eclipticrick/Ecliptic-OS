import * as React from 'react';
import {IGenericWindowProps} from '../../components/Window/GenericWindow';
import Window from '../../components/Window/Base/Window';
import applications from '../../appdata/applications';
import WindowMenu from './WindowMenu/WindowMenu';
import * as classes from './Calculator.module.scss';
import {Button, Grid} from '@material-ui/core';

interface ICalculatorState {
    state: string
}

enum Clicked {
    ABOUT = 'ABOUT',
    VIEW_STANDARD = 'VIEW_STANDARD',
    VIEW_SCIENTIFIC = 'VIEW_SCIENTIFIC',
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
        standard: Clicked.VIEW_STANDARD,
        scientific: Clicked.VIEW_SCIENTIFIC,
        history: Clicked.HISTORY,
    },
    Help: {
        about: Clicked.ABOUT
    }
};

export class Calculator extends React.Component<IGenericWindowProps, ICalculatorState> {
    public render() {
        const { applicationId, maximized, minimized, selected } = this.props;
        const { id, icon, window } = applications.find(a => a.id === applicationId);
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
                            <input disabled value={'123*456'}/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>

                            <Grid container direction='column'>
                                <Grid item>
                                    <Button disabled/>
                                </Grid>
                                <Grid item>
                                    <Button color='secondary'>
                                        MC
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button color='secondary'>
                                        MR
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button color='secondary'>
                                        MS
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button color='secondary'>
                                        M+
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={10}>

                            <Grid container>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        Backspace
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        CE
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        C
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        7
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        8
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        9
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        /
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary'>
                                        sqrt
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        4
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        5
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        6
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        *
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary'>
                                        %
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        1
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        2
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        3
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        -
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary'>
                                        1/x
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Button color='primary'>
                                        +/-
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary' variant='outlined'>
                                        0
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='primary'>
                                        .
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary'>
                                        +
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button color='secondary' variant='outlined'>
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
