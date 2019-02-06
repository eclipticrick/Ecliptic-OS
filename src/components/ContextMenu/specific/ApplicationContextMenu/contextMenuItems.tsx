import {ContextMenuType, IContextItem} from '../../ContextMenu';
import {IApplicationContextMenuPassedProps, IApplicationContextMenuProps, OuterContextType} from './ApplicationContextMenu';

const contextMenuItems = (props: IApplicationContextMenuProps & IApplicationContextMenuPassedProps): IContextItem[] => {
    const { application, context } = props;

    let contextSpecificItems = [] as IContextItem[];

    if (context === OuterContextType.DESKTOP) {
        contextSpecificItems = [
            { type: ContextMenuType.SEPERATOR },
            {
                type: ContextMenuType.MENUITEM,
                name: 'Remove',
                onClick: () => props.removeDesktopShortcut(application.id)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Start menu (pin)',
                        onClick: () => props.pinApplicationToStartMenu(application.id)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(application.id)
                    }
                ] as IContextItem[]
            }
        ];
    }
    if (context === OuterContextType.TASKBAR_QUICKACCESS) {
        contextSpecificItems = [
            { type: ContextMenuType.SEPERATOR },
            {
                type: ContextMenuType.MENUITEM,
                name: 'Remove',
                onClick: () => props.removeQuickAccessShortcut(application.id)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(application.id)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Start menu (pin)',
                        onClick: () => props.pinApplicationToStartMenu(application.id)
                    }
                ] as IContextItem[]
            }
        ];
    }
    if (context === OuterContextType.STARTMENU_PINNED) {
        contextSpecificItems = [
            { type: ContextMenuType.SEPERATOR },
            {
                type: ContextMenuType.MENUITEM,
                name: 'Unpin',
                onClick: () => props.unpinApplicationToStartMenu(application.id)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(application.id)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(application.id)
                    }
                ] as IContextItem[]
            }
        ];
    }
    if (context === OuterContextType.STARTMENU_RECENT) {
        contextSpecificItems = [
            { type: ContextMenuType.SEPERATOR },
            {
                type: ContextMenuType.MENUITEM,
                name: 'Pin',
                onClick: () => props.pinApplicationToStartMenu(application.id)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(application.id)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(application.id)
                    }
                ] as IContextItem[]
            }
        ];
    }
    if (context === OuterContextType.STARTMENU_ALL) {
        contextSpecificItems = [
            { type: ContextMenuType.SEPERATOR },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Start menu (pin)',
                        onClick: () => props.pinApplicationToStartMenu(application.id)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(application.id)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(application.id)
                    }
                ] as IContextItem[]
            }
        ];
    }
    return [
        {
            type: ContextMenuType.MENUITEM,
            name: 'Open',
            iconSrc: application.icon.src,
            onClick: () => props.openWindow(application)
        },
        ...contextSpecificItems
    ];
};
export default contextMenuItems;
