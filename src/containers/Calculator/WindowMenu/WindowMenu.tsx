import * as React from 'react';

import * as classes from './WindowMenu.module.scss';
import {Calculator} from '../Calculator';
import {Clicked} from '../Enum/Clicked';
import {MenuActionHandler} from './Logic/MenuActionHandler';

export interface IWindowMenuProps {
    parent: Calculator,
    menuTree: {
        [menuCategory: string]: {
            [menuCategoryItem: string]: string | string[]
        }
    }
}

const actionHandler = new MenuActionHandler();
// const itemClickedHandler = (menuItem: Clicked) => {
//     // todo: temp
//     else if (menuItem === Clicked.TEST_1) {
//         const app = applications.find(app => app.id === ApplicationId.POPUP_WARNING_ONLY_CLOSABLE);
//         app.window.title = 'Warning';
//         app.window.children = (
//             <div className={popupClasses.padding}>
//                 <img alt='about' className={popupClasses.left} src={warningIcon}/>
//                 <div className={popupClasses.info}>
//                     overlay popup test
//                 </div>
//             </div>
//         );
//         this.props.openWindow(app, WindowInstanceType.POPUP);
//     } else if (menuItem === Clicked.TEST_2) {
//         const app = applications.find(app => app.id === ApplicationId.POPUP_ERROR_ONLY_CLOSABLE);
//         app.window.title = 'Error';
//         app.window.children = (
//             <div className={popupClasses.padding}>
//                 <img alt='about' className={popupClasses.left} src={errorIcon}/>
//                 <div className={popupClasses.info}>
//                     only closable popup test
//                 </div>
//             </div>
//         );
//         this.props.openWindow(app);
//     } else if (menuItem === Clicked.TEST_3) {
//         const app = applications.find(app => app.id === ApplicationId.POPUP_HELP);
//         app.window.title = 'Help';
//         app.window.children = (
//             <div className={popupClasses.padding}>
//                 <img alt='about' className={popupClasses.left} src={helpIcon}/>
//                 <div className={popupClasses.info}>
//                     minimizable popup test
//                 </div>
//             </div>
//         );
//         this.props.openWindow(app);
//     } else if (menuItem === Clicked.TEST_4) {
//         alert('nothing to test over here...')
//     } else if (menuItem === Clicked.TEST_5) {
//         alert('nothing to test over here...')
//     }
//     // todo: /temp
// };

const windowMenu = ({parent, menuTree}: IWindowMenuProps) => {

    return (
        <div className={classes.root}>
            {Object.keys(menuTree).map(menuCategory => (
                <div key={`menu-${menuCategory}`} className={classes.menuGroup}>
                    {menuCategory}
                    <div className={classes.menuGroupContent}>
                        {Object.keys(menuTree[menuCategory]).map(menuItem => {
                            const menuItemValue = menuTree[menuCategory][menuItem];
                            let menuItemString: string;
                            let menuItemTextRight: string = null;
                            if (typeof menuItemValue === 'string') {
                                menuItemString = String(menuItemValue)
                            } else {
                                menuItemString = String(menuItemValue[0]);
                                menuItemTextRight = String(menuItemValue[1]);
                            }
                            return (
                                <div key={`menu-${menuCategory}-${menuItem}`}
                                     onClick={() => actionHandler.handleAction(parent, menuItemString as Clicked)}>
                                    <span>{menuItem}</span>
                                    <span>{menuItemTextRight}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default windowMenu;
