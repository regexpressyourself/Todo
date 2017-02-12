import React from 'react';

function Container(props) {
    let className = "container " + props.className;
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Container;

