import {connect} from "react-redux";
import {AuthPage} from "./auth";
import {select} from "../../../model";

export default connect((state) => ({
    auth: state.auth,
    authSubmitting: select.auth.authSubmitting(state),
    loginError: select.auth.loginError(state)
}))(AuthPage);