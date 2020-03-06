import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate(){
        console.log('[Modal.js] compoenentDidUpdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} click={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    };
}

export default modal;