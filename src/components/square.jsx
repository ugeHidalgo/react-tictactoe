'use strict';

import React from 'react';

export default class Square extends React.Component {
    static get propTypes() {
        return {
            value: React.PropTypes.number.isRequired
        };
      }

    render() {
        return (
        <button className="square">
            {this.props.value}
        </button>
        );
    }
}