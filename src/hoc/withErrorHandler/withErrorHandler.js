import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            requestInterceptor: axios.interceptors.request.use((request) => {
                this.setState({error: null});
                return request;
            }),
            responseInterceptor: axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount(){
            //console.log('componentWillUnmout', this.state.requestInterceptor, this.state.responseInterceptor)
            axios.interceptors.request.eject(this.state.requestInterceptor);
            axios.interceptors.request.eject(this.state.responseInterceptor);
        }

        errorConfirmHanlder= () =>{
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                    modalClosed={this.errorConfirmHanlder}
                    show={this.state.error}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}


export default withErrorHandler;