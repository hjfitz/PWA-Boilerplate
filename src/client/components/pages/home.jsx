import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { children: <h3>I'm rendered by React in <code>src/client/components/pages</code></h3> };
    }

    componentDidMount() {
        // perfect place to hit an endpoint and set state
    }

    render() {
        return this.state.children;
    }
}