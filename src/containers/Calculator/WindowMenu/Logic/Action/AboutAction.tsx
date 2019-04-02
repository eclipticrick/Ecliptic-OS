import {Action} from './Action';
import {Calculator} from '../../../Calculator';
import applications, {ApplicationId} from '../../../../../appdata/applications';
import * as popupClasses from '../../../../../components/Window/WindowTypes/Application/Popup.module.scss';
import * as infoIcon from '../../../../../assets/images/icons/068-info.svg';
import * as React from 'react';

export class AboutAction extends Action {
    public execute(environment: Calculator): void {
        const app = applications.find(context => context.id === ApplicationId.POPUP_INFO);
        app.window.title = 'About Calculator';
        app.window.children = (
            <div className={popupClasses.padding}>
                <img alt='about' className={popupClasses.left} src={infoIcon}/>
                <div className={popupClasses.info}>
                    Version 0.0.2<br/>
                    © Wesley Veenendaal & Maarten Bobbeldijk :)
                </div>
            </div>
        );
        environment.props.openWindow(app);
    }

}
