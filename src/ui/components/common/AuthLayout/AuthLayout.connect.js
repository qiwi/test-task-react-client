import {connect} from "react-redux";
import {select} from "../../../model";
import {AuthLayout} from "./AuthLayout";

export default connect((state) => ({
    isInitial: select.auth.isInitial(state),
    isLoggedIn: select.auth.isLoggedIn(state),
    isLoading: select.auth.isLoading(state),
    router: state.router
}), (dispatch) => {
    return {
        checkAuth: dispatch.auth.checkAuth
    }
})(AuthLayout);