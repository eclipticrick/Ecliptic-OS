import * as React from 'react';

import * as classes from './WindowMenu.module.scss';

export interface IWindowMenuProps {
    menuTree: any // TODO
}

const windowMenu = ({ menuTree }: IWindowMenuProps) => {

    return (
        <div className={classes.root}>
            {Object.keys(menuTree).map(menuCategory => (
                <div key={`menu-${menuCategory}`} className={classes.menuGroup}>
                    {menuCategory}
                    <div className={classes.menuGroupContent}>

                        {Object.keys(menuTree[menuCategory]).map(menuItem => (
                            <div key={`menu-${menuCategory}-${menuItem}`} onClick={menuTree[menuCategory][menuItem]}>
                                {menuItem}
                            </div>
                        ))}
                        </div>
                </div>
            ))}
        </div>
    );
};

export default windowMenu;
