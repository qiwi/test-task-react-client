import {connect} from "react-redux";
import {select} from "../../../model";
import {AuthLayout} from "./auth_layout";

export default connect((state) => ({
        loggedIn: select.auth.loggedIn(state),
        loading: select.auth.loading(state),
        authLayout: state.auth,
        router: state.router,
        initial: select.auth.initial(state)
}))(AuthLayout);