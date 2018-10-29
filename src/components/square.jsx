'use strict';

import React from 'react';

export default class Square extends React.Component {
    static get propTypes() {
        return {
            value: React.PropTypes.string,
            onClick: React.PropTypes.func
        };
    }

    render() {
        return (
            <button 
                className="square" 
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}