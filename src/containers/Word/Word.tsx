import * as React from 'react';
import * as classes from './Word.module.scss';
import Window from '../../components/Window/Window';
import applications from '../../appdata/applications';

export class Word extends React.Component<{}, {}> {
    public render() {
        const { name, iconSrc, minWidth, minHeight } = applications.find(a => a.id === 'word');
        return (
            <Window title={name} minWidth={minWidth} minHeight={minHeight} iconSrc={iconSrc}>
                <div className={classes.root}>
                    word
                </div>
            </Window>
        );
    }
}

export default Word;
