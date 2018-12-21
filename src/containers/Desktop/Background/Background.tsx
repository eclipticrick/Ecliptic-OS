import * as React from 'react';
import * as classes from './Background.module.scss';
import * as backgroundSrc from '../../../assets/images/wallpapers/default.jpg';

const background = () => (
    <div className={classes.root} style={{ background: `url(${backgroundSrc}) no-repeat bottom center / cover` }}/>
);

export default background;
