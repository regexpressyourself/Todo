import React from 'react';

function Row(props) {
    let className = "row " + props.className;
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Row;
