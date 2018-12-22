import * as React from 'react';

import InternetExplorer from '../containers/InternetExplorer/InternetExplorer';
import GoogleChrome from '../containers/GoogleChrome/GoogleChrome';
import Word from '../containers/Word/Word';

import * as ieIcon from '../assets/images/icons/internet-explorer.png';
import * as chromeIcon from '../assets/images/icons/svg/chrome.svg';
import * as wordIcon from '../assets/images/icons/svg/word.svg';

export enum ApplicationId {
    INTERNET_EXPLORER = 'INTERNET_EXPLORER',
    GOOGLE_CHROME = 'GOOGLE_CHROME',
    WORD = 'WORD',
}

export interface IApplication {
    id: ApplicationId,
    icon: {
        name: string,
        src: string,
        scale?: number
    },
    window: {
        Component: any
        title?: string
        minHeight?: number
        minWidth?: number
    }
}

const applications: IApplication[] = [
    {
        id: ApplicationId.INTERNET_EXPLORER,
        icon: {
            name: 'Interwebz Explorer',
            src: ieIcon,
            scale: 1.2
        },
        window: {
            Component: InternetExplorer,
            title: 'Interwebz title',
            minHeight: 300,
            minWidth: 400,
        }
    },
    {
        id: ApplicationId.GOOGLE_CHROME,
        icon: {
            name: 'Google Chrome',
            src: chromeIcon,
        },
        window: {
            Component: GoogleChrome,
            title: 'Google Chrome windowtitle',
            minWidth: 400,
        }
    },
    {
        id: ApplicationId.WORD,
        icon: {
            name: 'Word',
            src: wordIcon,
        },
        window: {
            Component: Word,
            title: 'Word',
            minWidth: 600,
        }
    }
];

export default applications;
