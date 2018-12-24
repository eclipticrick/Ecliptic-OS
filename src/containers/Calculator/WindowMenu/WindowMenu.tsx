import * as React from 'react';

import * as classes from './WindowMenu.module.scss';

export interface IWindowMenuProps {
    onItemClicked: (menuItem: string) => any,
    menuTree: {
        [menuCategory: string]: {
            [menuCategoryItem: string]: string | string[]
        }
    }
}

const windowMenu = ({ menuTree, onItemClicked }: IWindowMenuProps) => {

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
                                <div key={`menu-${menuCategory}-${menuItem}`} onClick={() => onItemClicked(menuItemString)}>
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
