import React from 'react';
import {styled} from '@qiwi/pijma-core';
import {Button, PasswordField, TextField} from '@qiwi/pijma-desktop';
import {Field, Form} from 'react-final-form';
import * as EmailValidator from 'email-validator';

const AuthFormViewContainer = styled('div')`
    width: 281px;
    margin: auto;
`;

const ButtonContainer = styled('div')`
    width: 150px;
    margin: 30px auto 13px;
`;

const HeaderLabel = styled('h2')`
    font-size: 17px;
    font-weight: 500;
    text-align: center;
    font-weight: bold;
    margin-bottom: 30px;
`;

const EmailField = ({
                        input,
                        meta,
                        ...rest
                    }) => (
    <TextField {...rest}
               {...input}
               type='email'
               placeholder={'email'}
               error={meta.touched && (meta.error || rest.error)}
    />
);

const PasswordCustomField = ({
                           input,
                           meta,
                           ...rest
                       }) => (
    <PasswordField {...rest}
                   {...input}
                   placeholder={'Пароль'}
                   viewed={false}
                   error={meta.touched && (meta.error || rest.error)}
    />
);

export class AuthPage extends React.Component {

    submitFormHandler(values) {
        this.props.login({
            email: values.email,
            password: values.password
        });
    }

    render() {
        const {isAuthSubmitting, getErrorMessage} = this.props;
        return (
            <AuthFormViewContainer>
                <Form
                    onSubmit={this.submitFormHandler.bind(this)}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Введите email';
                        } else if (!EmailValidator.validate(values.email)) {
                            errors.email = 'Необходимо ввести корректный email адрес';
                        }
                        if (!values.password) {
                            errors.password = 'Введите пароль';
                        } else if (values.password.length < 8) {
                            errors.password = 'Поле пароль должно содержать более 8 символов';
                        }
                        return errors;
                    }}
                    render={({
                                 submitError,
                                 handleSubmit,
                                 reset,
                                 submitting,
                                 pristine,
                                 invalid
                             }) => (
                        <form>
                            <HeaderLabel>Вход</HeaderLabel>
                            <Field autoFocus={true} name='email' component={EmailField} disabled={isAuthSubmitting}/>
                            <Field name={'password'} component={PasswordCustomField} disabled={isAuthSubmitting}
                                   error={getErrorMessage}
                            />
                            <ButtonContainer>
                                <Button type='submit'
                                        kind='brand'
                                        size='normal'
                                        text='Войти'
                                        onClick={() => {
                                            if (invalid || isAuthSubmitting) return;
                                            handleSubmit(arguments);
                                        }}
                                        disabled={invalid || isAuthSubmitting}
                                        loading={isAuthSubmitting}
                                />
                            </ButtonContainer>
                        </form>)
                    }
                />
            </AuthFormViewContainer>
        );
    }
}
