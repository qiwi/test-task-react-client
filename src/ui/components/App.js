import './common/Layout';
import React, {Component} from 'react';
import {ConnectedRouter} from "connected-react-router";
import {ThemeProvider, themes} from '@qiwi/pijma-core';
import Root from './common/Root';
import Content from './common/Content';
import {Provider} from 'react-redux';
import {history, store} from '../model/';
import ErrorBoundary from './common/ErrorBoundary';
import Spreader from './common/Spreader';
import {Redirect, Route, Switch} from 'react-router';
import AuthPage from "./pages/auth";
import UsersListPage from "./pages/usersList";
import {AuthLayout} from "./common/AuthLayout";

class App extends Component {
    render() {
        return (<ThemeProvider theme={themes.orange}>
            <Root>
                <Content>
                    <Provider store={store}>
                        <ConnectedRouter history={history}>
                            <ErrorBoundary>
                                <Spreader>
                                    <Switch>
                                        <Route exact path='/auth' component={() => {
                                            return (
                                                <AuthLayout> <AuthPage/> </AuthLayout>
                                            )
                                        }}/>
                                        <Route exact path='/users' component={() => {
                                            return (
                                                <AuthLayout>
                                                    <UsersListPage/>
                                                </AuthLayout>
                                            );
                                        }}/>
                                        <Route path='/' component={() => {
                                            return <Redirect to='/users'/>
                                        }}/>
                                    </Switch>
                                </Spreader>
                            </ErrorBoundary>
                        </ConnectedRouter>
                    </Provider>
                </Content>
            </Root>
        </ThemeProvider>)
    }
}

export default App;
