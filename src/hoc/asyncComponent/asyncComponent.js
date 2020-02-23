import React, {Component} from 'react';

const asyncComponent = importComponent => {
    return class extends Component {

        state = {
            component: null,
        };

        componentDidMount() {
            importComponent()
            .then(component => {
                this.setState({ component: component.default });
            });
        }

        render() {
            const ComponentOut = this.state.component;
            return ComponentOut ? <ComponentOut {...this.props} /> : null;
        }

    }
}

export default asyncComponent;
