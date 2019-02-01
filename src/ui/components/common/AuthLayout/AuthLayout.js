import React, {Component} from 'react';
import {Redirect} from "react-router";
import {Loader} from "../Loader";

export class AuthLayout extends Component {
    render() {
        const {isLoggedIn, isLoading, isInitial} = this.props;
        if (isLoggedIn) {
            if (this.isAuthRoute()) {
                return <Redirect to={'/'}/>
            }
            return <div>{this.props.children}</div>
        } else {
            if (isLoading || isInitial) {
                return <Loader/>
            } else if (this.isAuthRoute()) {
                return this.props.children;
            }  else {
                return <Redirect to={'/auth'}/>
            }
        }
    }

    componentDidMount() {
        if (this.props.isInitial) this.props.checkAuth();
    }

    isAuthRoute() {
        return this.props.router.location.pathname === '/auth';
    }
}