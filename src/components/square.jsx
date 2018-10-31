'use strict';

import React from 'react';

const Square = function(props) {

    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
};

Square.propTypes = {
    value : React.PropTypes.string,
    onClick : React.PropTypes.func
}


export default Square;
