import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './Ribbon.less';


export function Ribbon(props) {
    return (
        <>
            <div className={`ribbon fade-bottom ${props.color} ${props.textColor} ${props.position}`}>
                <div className={"arrow-right"}>

                </div>
                {props.textRibbon}
            </div>
        </>
    );
}
