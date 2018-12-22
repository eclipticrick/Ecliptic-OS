import * as React from 'react';

import InternetExplorer from '../containers/InternetExplorer/InternetExplorer';
import GoogleChrome from '../containers/GoogleChrome/GoogleChrome';
import Word from '../containers/Word/Word';

import * as ieIcon from '../assets/images/icons/internet-explorer.png';
import * as chromeIcon from '../assets/images/icons/svg/chrome.svg';
import * as wordIcon from '../assets/images/icons/svg/word.svg';

export interface IApplication {
    id: string,
    name: string,
    iconSrc: string,
    window: any, // React.Component<any, any, any>,
    minHeight?: number
    minWidth?: number
}

const applications: IApplication[] = [
    {
        id: 'ie',
        name: 'Interwebz Explorer',
        iconSrc: ieIcon,
        window: InternetExplorer,
        minHeight: 300,
        minWidth: 400
    },
    {
        id: 'chrome',
        name: 'Google Chrome',
        iconSrc: chromeIcon,
        window: GoogleChrome,
        minWidth: 400
    },
    {
        id: 'word',
        name: 'Word',
        iconSrc: wordIcon,
        window: Word,
        minWidth: 600
    }
];

export default applications;
