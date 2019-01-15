import React, {Component} from 'react';
import {Redirect} from "react-router";
import {Loader} from "../Loader";

export class AuthLayout extends Component {
    render() {
        if (this.props.loggedIn) {
            if (this.isAuthRoute()) {
                return <Redirect to={'/'}/>
            }
            return <div>{this.props.children}</div>
        } else {
            if (this.props.loading || this.props.initial) {
                return <Loader/>
            } else if (this.isAuthRoute()) {
                return this.props.children;
            }  else {
                return <Redirect to={'/auth'}/>
            }
        }
    }

    componentDidMount() {
        if (this.props.initial) this.props.dispatch.auth.checkAuth();
    }

    isAuthRoute() {
        return this.props.router.location.pathname === '/auth';
    }
}