import React from 'react';

function Col4(props) {
    let className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 "+ props.className;

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Col4;
