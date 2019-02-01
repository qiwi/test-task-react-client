import {UsersListPage} from './UsersListPage';
import {connect} from 'react-redux';

export default connect((state) => {
    return {
        router: state.router
    }
})(UsersListPage);