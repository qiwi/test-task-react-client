import UsersListPage from './users-list';
import {connect} from 'react-redux';

export default connect(({router}) => ({router}))(UsersListPage);