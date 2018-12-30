import * as React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import ContextMenu, {IContextItem, IContextMenu, ContextMenuType} from '../../ContextMenu';

export interface IDesktopContextMenuProps {
    children?: any // todo: inherit from react props?
}
export interface IDesktopContextMenuPassedProps {
    toggleDesktopBackground: () => void
}

export class DesktopContextMenu extends React.Component<IDesktopContextMenuProps & IDesktopContextMenuPassedProps, {}> {
    public render() {
        const { props, props: { children} } = this;

        const items: IContextItem[] = [
            {
                type: ContextMenuType.MENUITEM,
                name: 'Toggle background',
                onClick: props.toggleDesktopBackground
            }
        ];

        const menu = { items } as IContextMenu;

        return (
            <ContextMenu uid={`desktop`} menu={menu}>
                {children}
            </ContextMenu>
        );
    }
}

const mapDispatchToProps = (dispatch: any): Partial<IDesktopContextMenuPassedProps> => ({
    toggleDesktopBackground: () => dispatch(actions.toggleDesktopBackground())
});
export default connect(null, mapDispatchToProps)(DesktopContextMenu);
