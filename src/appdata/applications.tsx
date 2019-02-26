import * as React from 'react';

import InternetExplorer from '../containers/InternetExplorer/InternetExplorer';
import LimeWire from '../containers/LimeWire/LimeWire';
import Outlook from '../containers/Outlook/Outlook';
import Notepad from '../containers/Notepad/Notepad';
import TodoList from '../containers/TodoList/TodoList';
import WhatsApp from '../containers/WhatsApp/WhatsApp';
import Calculator from '../containers/Calculator/Calculator';
import Computer from '../containers/Computer/Computer';
import Paint from '../containers/Paint/Paint';

import * as explorerIcon from '../assets/images/icons/026-folder-1.svg';
import * as ieIcon from '../assets/images/icons/internet-explorer.png';
import * as limeWireIcon from '../assets/images/icons/008-lime.svg';
import * as outlookIcon from '../assets/images/icons/011-outlook.svg';
import * as notepadIcon from '../assets/images/icons/030-document.svg';
import * as todoListIcon from '../assets/images/icons/031-list.svg';
import * as whatsappIcon from '../assets/images/icons/034-whatsapp.svg';
import * as calculatorIcon from '../assets/images/icons/040-calculator.svg';
import * as computerIcon from '../assets/images/icons/041-smart-tv.svg';
import * as paintIcon from '../assets/images/icons/043-art.svg';
import * as errorIcon from '../assets/images/icons/070-cancel.svg';
import * as infoIcon from '../assets/images/icons/068-info.svg';
import * as warningIcon from '../assets/images/icons/069-warning.svg';
import * as helpIcon from '../assets/images/icons/071-question.svg';

import Window, {IPopupWindowProps} from '../components/Window/Window';
import {ReactNode} from "react";
import Explorer from "../containers/Explorer/Explorer";

export enum ApplicationId {
    POPUP_ERROR_ONLY_CLOSABLE = 'POPUP_ERROR_ONLY_CLOSABLE',
    POPUP_WARNING_ONLY_CLOSABLE = 'POPUP_WARNING_ONLY_CLOSABLE',
    POPUP_INFO_ONLY_CLOSABLE = 'POPUP_INFO_ONLY_CLOSABLE',
    POPUP_HELP_ONLY_CLOSABLE = 'POPUP_HELP_ONLY_CLOSABLE',

    POPUP_ERROR   = 'POPUP_ERROR',
    POPUP_WARNING = 'POPUP_WARNING',
    POPUP_INFO    = 'POPUP_INFO',
    POPUP_HELP    = 'POPUP_HELP',

    EXPLORER          = 'EXPLORER',
    INTERNET_EXPLORER = 'INTERNET_EXPLORER',
    LIME_WIRE         = 'LIME_WIRE',
    OUTLOOK           = 'OUTLOOK',
    NOTEPAD           = 'NOTEPAD',
    TODO_LIST         = 'TODO_LIST',
    WHATSAPP          = 'WHATSAPP',
    CALCULATOR        = 'CALCULATOR',
    COMPUTER          = 'COMPUTER',
    PAINT             = 'PAINT',
}
export enum DisplayLevel {
    NOT_VISIBLE_ANYWHERE = 'NOT_VISIBLE_ANYWHERE',
    ONLY_VISIBLE_IN_TASKBAR_AS_ACTIVE_WINDOW = 'ONLY_VISIBLE_IN_TASKBAR_AS_ACTIVE_WINDOW',
    VISIBLE_EVERYWHERE = 'VISIBLE_EVERYWHERE',
}
export interface IApplication {
    id: ApplicationId,
    display: DisplayLevel,
    icon: {
        name: string,
        src: string,
        scale?: number
    },
    window: {
        Component: any
        props?: any
        title?: string
        children?: ReactNode
    }
}

const applications: IApplication[] = [
    {
        id: ApplicationId.POPUP_ERROR_ONLY_CLOSABLE,
        display: DisplayLevel.NOT_VISIBLE_ANYWHERE,
        icon: {
            name: 'Error',
            src: errorIcon
        },
        window: {
            Component: Window.Popup
        }
    },
    {
        id: ApplicationId.POPUP_WARNING_ONLY_CLOSABLE,
        display: DisplayLevel.NOT_VISIBLE_ANYWHERE,
        icon: {
            name: 'Warning',
            src: warningIcon
        },
        window: {
            Component: Window.Popup
        }
    },
    {
        id: ApplicationId.POPUP_INFO_ONLY_CLOSABLE,
        display: DisplayLevel.NOT_VISIBLE_ANYWHERE,
        icon: {
            name: 'Info',
            src: infoIcon
        },
        window: {
            Component: Window.Popup
        }
    },
    {
        id: ApplicationId.POPUP_HELP_ONLY_CLOSABLE,
        display: DisplayLevel.NOT_VISIBLE_ANYWHERE,
        icon: {
            name: 'Help',
            src: helpIcon
        },
        window: {
            Component: Window.Popup
        }
    },
    {
        id: ApplicationId.POPUP_ERROR,
        display: DisplayLevel.ONLY_VISIBLE_IN_TASKBAR_AS_ACTIVE_WINDOW,
        icon: {
            name: 'Error',
            src: errorIcon
        },
        window: {
            Component: Window.Popup,
            props: { minimizable: true } as Partial<IPopupWindowProps>
        }
    },
    {
        id: ApplicationId.POPUP_WARNING,
        display: DisplayLevel.ONLY_VISIBLE_IN_TASKBAR_AS_ACTIVE_WINDOW,
        icon: {
            name: 'Warning',
            src: warningIcon
        },
        window: {
            Component: Window.Popup,
            props: { minimizable: true } as Partial<IPopupWindowProps>
        }
    },
    {
        id: ApplicationId.POPUP_INFO,
        display: DisplayLevel.ONLY_VISIBLE_IN_TASKBAR_AS_ACTIVE_WINDOW,
        icon: {
            name: 'Info',
            src: infoIcon
        },
        window: {
            Component: Window.Popup,
            props: { minimizable: true } as Partial<IPopupWindowProps>
        }
    },
    {
        id: ApplicationId.POPUP_HELP,
        display: DisplayLevel.ONLY_VISIBLE_IN_TASKBAR_AS_ACTIVE_WINDOW,
        icon: {
            name: 'Help',
            src: helpIcon
        },
        window: {
            Component: Window.Popup,
            props: { minimizable: true } as Partial<IPopupWindowProps>
        }
    },
    {
        id: ApplicationId.EXPLORER,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Explorer',
            src: explorerIcon
        },
        window: {
            Component: Explorer
        }
    },
    {
        id: ApplicationId.INTERNET_EXPLORER,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Internet Explorer',
            src: ieIcon,
            scale: 1.2
        },
        window: {
            Component: InternetExplorer
        }
    },
    {
        id: ApplicationId.LIME_WIRE,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Lime Wire',
            src: limeWireIcon
        },
        window: {
            Component: LimeWire,
            title: 'Lime Wire'
        }
    },
    {
        id: ApplicationId.OUTLOOK,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Outlook',
            src: outlookIcon
        },
        window: {
            Component: Outlook,
            title: 'Outlook'
        }
    },
    {
        id: ApplicationId.NOTEPAD,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Notepad',
            src: notepadIcon
        },
        window: {
            Component: Notepad
        }
    },
    {
        id: ApplicationId.TODO_LIST,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Todo list',
            src: todoListIcon
        },
        window: {
            Component: TodoList,
            title: 'My todo\'s'
        }
    },
    {
        id: ApplicationId.WHATSAPP,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'WhatsApp',
            src: whatsappIcon
        },
        window: {
            Component: WhatsApp,
            title: 'WhatsApp'
        }
    },
    {
        id: ApplicationId.CALCULATOR,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Calculator',
            src: calculatorIcon
        },
        window: {
            Component: Calculator,
            title: 'Calculator'
        }
    },
    {
        id: ApplicationId.COMPUTER,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'My Computer',
            src: computerIcon
        },
        window: {
            Component: Computer,
            title: 'My Computer'
        }
    },
    {
        id: ApplicationId.PAINT,
        display: DisplayLevel.VISIBLE_EVERYWHERE,
        icon: {
            name: 'Paint',
            src: paintIcon
        },
        window: {
            Component: Paint,
            title: 'Paint'
        }
    }
];

export default applications;
