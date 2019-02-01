import {connect} from "react-redux";
import {AuthPage} from "./AuthPage";
import {select} from "../../../model";

export default connect((state) => ({
    isAuthSubmitting: select.auth.isAuthSubmitting(state),
    getErrorMessage: select.auth.getErrorMessage(state)
}), ({auth: {login}}) => ({login}))(AuthPage);