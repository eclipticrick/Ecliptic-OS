import * as React from 'react';
import { Menu, Item, Separator, Submenu, MenuProvider, animation } from 'react-contexify';
import './ContextMenu.scss';

export interface IContextMenu {
    items: IContextItem[]
}
export interface IContextItem {
    type: ContextMenuType
    name?: string
    items?: IContextItem[]
    onClick?: ({event, props}: any) => any
    disabled?: boolean
}
export enum ContextMenuType {
    SEPERATOR = 'SEPERATOR',
    MENUITEM = 'MENUITEM',
    SUBMENU = 'SUBMENU',
}

export interface IContextMenuProps {
    uid: string | number
    children: any // todo: inherit from react props?
    menu: IContextMenu
}

const onClick = ({ event, props }: any) => console.log('[ContextMenu.tsx] NO ONCLICK HANDLER GIVEN', event, props);

const innerContextMenu = (uniqueId: string | number, items: IContextItem[], depth = 0) => {

    return items.map((item, i: number) => {
        const key = `menuitem-${uniqueId}-${depth}-${i}`;
        let template;

        if (item.type === ContextMenuType.SEPERATOR) {
            template = <Separator key={key}/>

        } else if (item.type === ContextMenuType.MENUITEM) {
            template = (
                <Item key={key}
                      onClick={(args) => item.onClick ? item.onClick(args) : onClick(args)}
                      disabled={item.disabled}>
                    {item.name}
                </Item>
            )
        } else {
            template = <Submenu key={key} label={item.name}>{innerContextMenu(uniqueId, item.items, depth + 1)}</Submenu>
        }

        return template;
    });
};

const contextMenu = ({uid, children, menu}: IContextMenuProps) => (
    <>
        <MenuProvider id={`menu-${uid}`} style={{ boxShadow: '0 0 1px purple inset', display: 'inline-flex' }}>
            {children}
        </MenuProvider>
        <Menu id={`menu-${uid}`} animation={animation.fade}>
            {innerContextMenu(uid, menu.items)}
        </Menu>
    </>
);

export default contextMenu;
