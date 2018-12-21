import * as React from 'react';
import * as classes from './IconGrid.module.scss';
import DesktopIcon from './DesktopIcon/DesktopIcon';

import * as ie from '../../../assets/images/icons/internet-explorer.png';
import * as chrome from '../../../assets/images/icons/svg/chrome.svg';
import * as drive from '../../../assets/images/icons/svg/drive.svg';
import * as excel from '../../../assets/images/icons/svg/excel.svg';
import * as word from '../../../assets/images/icons/svg/word.svg';
import * as powerpoint from '../../../assets/images/icons/svg/powerpoint.svg';
import * as outlook from '../../../assets/images/icons/svg/outlook.svg';

const iconGrid = () => (
    <div className={classes.root}>
        <DesktopIcon name='Interwebz Explorer' iconSrc={ie} scale={1.2}/>
        <DesktopIcon name='Google Chrome' iconSrc={chrome}/>
        <DesktopIcon name='Google Drive' iconSrc={drive}/>
        <DesktopIcon name='Excel' iconSrc={excel}/>
        <DesktopIcon name='Word' iconSrc={word}/>
        <DesktopIcon name='Powerpoint' iconSrc={powerpoint}/>
        <DesktopIcon name='Outlook' iconSrc={outlook}/>
    </div>
);

export default iconGrid;
