import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        };

        requestInterceptor = null;
        responseInterceptor = null;

        constructor(props) {
            super(props);

            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        { this.state.error === null ? null : this.state.error.message }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }

    };
}

export default withErrorHandler;
