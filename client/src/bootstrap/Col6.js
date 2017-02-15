import React from 'react';

function Col6(props) {
    let className = "col-xs-6 col-sm-6 col-md-6 col-lg-6 " + props.className;
    return (

        <div className={className}>
            {props.children}
        </div>
    )
}

export default Col6;
