import * as React from 'react';
import * as classes from './TileIcon.module.scss';
import {IApplication} from '../../../../appdata/applications';
import classNames from 'classnames';

export interface ITileIconProps {
    application: IApplication
    iconSrc: string
    name: string
    selected: boolean
    scale?: number
    onClick?: (name: string) => any
    onDoubleClick?: (name: string) => any
}

const tileIcon = (props: ITileIconProps) => {
    const { iconSrc, name, scale, selected } = props;

    return (
        <div className={classNames(classes.root, selected ? classes.selected : null)}>
            <div> {/* <DesktopContextMenu> */}
                <div className={classes.innerRoot}
                     onClick={(e) => {e.stopPropagation(); props.onClick(name)}}
                     onDoubleClick={() => props.onDoubleClick(name)}>
                    <div className={classes.iconWrapper}>
                        <img src={iconSrc} style={{ transform: `scale(${scale ? scale : 1})` }} draggable={false} />
                    </div>
                    <div className={classes.nameWrapper}>
                        {name}
                    </div>
                </div>
            </div> {/* </DesktopContextMenu> */}
        </div>
    );
};

export default tileIcon;
