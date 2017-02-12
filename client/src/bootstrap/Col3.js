import React from 'react';

function Col3(props) {
    let className="col-xs-3 col-sm-3 col-md-3 col-lg-3 " + props.className;

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Col3;
