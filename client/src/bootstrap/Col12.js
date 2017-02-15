import React from 'react';

function Col12(props) {
    let className = "col-xs-12 col-sm-12 col-md-12 col-lg-12 " + props.className;
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Col12;
