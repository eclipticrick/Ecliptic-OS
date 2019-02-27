import * as React from 'react';
import * as classes from './HarddriveIcon.module.scss';

export interface IHarddriveIconProps {
    iconSrc: string
    name: string
    onDoubleClick?: (name: string) => any
}

const harddriveIcon = (props: IHarddriveIconProps) => {
    const { iconSrc, name } = props;

    return (
        <div className={classes.root}>
            <div> {/* <DesktopContextMenu> */}
                <div className={classes.innerRoot}
                     onDoubleClick={() => props.onDoubleClick(name)}>
                    <div className={classes.iconWrapper}>
                        <img src={iconSrc} draggable={false} />
                    </div>
                    <div className={classes.nameWrapper}>
                        {name}
                    </div>
                </div>
            </div> {/* </DesktopContextMenu> */}
        </div>
    );
};

export default harddriveIcon;
