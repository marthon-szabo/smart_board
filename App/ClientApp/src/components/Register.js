import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationVisible: this.props.visible
        }
    }

    componentWillReceiveProps() {
    this.setState({ registrationVisible: this.props.visible });
    }

    openModal() {
        this.setState({
            registrationVisible: true
        });
    }

    closeModal() {
        this.setState({
            registrationVisible: false
        });
    }

    render() {
        console.log(this.state.registrationVisible);
        return (
            <section>
                <Modal className="register-modal" visible={this.state.registrationVisible} style={{ background: "#fcd281" }} width="400" height="600" effect="fadeInLeft" onClickAway={() => this.closeModal()}>
                    <form style={{ padding: '5%'}}>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                            <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" class="form-control" placeholder="Confirm Password " />
                        </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered <a href="#">sign in?</a>
                            </p>
                    </form>
                </Modal>
            </section>
        );
    }
}