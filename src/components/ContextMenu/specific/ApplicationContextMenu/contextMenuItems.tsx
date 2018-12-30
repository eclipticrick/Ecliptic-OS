import {ContextMenuType, IContextItem} from '../../ContextMenu';
import {IApplicationContextMenuPassedProps, IApplicationContextMenuProps, OuterContextType} from './ApplicationContextMenu';
import applications from '../../../../appdata/applications';

const contextMenuItems = (props: IApplicationContextMenuProps & IApplicationContextMenuPassedProps): IContextItem[] => {
    const {applicationId, context } = props;

    const application = applications.find(app => app.id === applicationId);

    let contextSpecificItems = [] as IContextItem[];

    if (context === OuterContextType.DESKTOP) {
        contextSpecificItems = [
            { type: ContextMenuType.SEPERATOR },
            {
                type: ContextMenuType.MENUITEM,
                name: 'Remove',
                onClick: () => props.removeDesktopShortcut(applicationId)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Start menu (pin)',
                        onClick: () => props.pinApplicationToStartMenu(applicationId)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(applicationId)
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
                onClick: () => props.removeQuickAccessShortcut(applicationId)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(applicationId)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Start menu (pin)',
                        onClick: () => props.pinApplicationToStartMenu(applicationId)
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
                onClick: () => props.unpinApplicationToStartMenu(applicationId)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(applicationId)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(applicationId)
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
                onClick: () => props.pinApplicationToStartMenu(applicationId)
            },
            {
                type: ContextMenuType.SUBMENU,
                name: 'Copy to',
                items: [
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(applicationId)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(applicationId)
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
                        onClick: () => props.pinApplicationToStartMenu(applicationId)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Desktop (make shortcut)',
                        onClick: () => props.addDesktopShortcut(applicationId)
                    },
                    {
                        type: ContextMenuType.MENUITEM,
                        name: 'Task bar (make shortcut)',
                        onClick: () => props.addQuickAccessShortcut(applicationId)
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
            onClick: () => props.openWindow(applicationId)
        },
        ...contextSpecificItems
    ];
};
export default contextMenuItems;
