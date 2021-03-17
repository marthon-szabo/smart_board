import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: this.props.visible
        }
    }

    componentWillReceiveProps() {
        this.setState({ loginVisible: this.props.visible });
    }

    openModal() {
        this.setState({
            loginVisible: true
        });
    }

    closeModal() {
        this.setState({
            loginVisible: false
        });
    }

    render() {
        return (
            <section>
                <Modal className="login-modal" visible={this.state.loginVisible} style={{ background: "#fcd281" }} width="400" height="600" effect="fadeInLeft" onClickAway={() => this.closeModal()}>
                    <form style={{ padding: '5%' }}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>


                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Don't have a  <a href="#">registration</a> yet?
                        </p>
                    </form>
                </Modal>
            </section>
        );
    }
}
