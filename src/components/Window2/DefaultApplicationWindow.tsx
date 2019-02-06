// import * as React from 'react';
// import Window from './Base/Window';
// import applications, {IApplication} from '../../appdata/applications';
// import {IWindowInstance} from '../../apptypings/window';
//
// export interface IDefaultApplicationWindowProps {
//     windowInstance: IWindowInstance
//     application: IApplication
//     selected: boolean
//     children?: any // TODO inherit from React.Props ?
// }
//
// const defaultApplicationWindow = ({ windowInstance, application, selected, children }: IDefaultApplicationWindowProps) => {
//     const { icon, window } = applications.find(a => a.id === application.id);
//
//     return (
//         <Window windowInstance={windowInstance}
//                 title={window.title}
//                 // minWidth={window.minWidth}
//                 // minHeight={window.minHeight}
//                 iconSrc={icon.src}
//                 // maximizable={typeof window.maximizable === 'undefined' ? true : window.maximizable}
//                 selected={selected}>
//             { children }
//         </Window>
//     );
// };
//
// export default defaultApplicationWindow;
//