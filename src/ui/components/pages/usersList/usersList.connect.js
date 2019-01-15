import UsersListPage from './usersList';
import {connect} from 'react-redux';

export default connect(({router}) => ({router}))(UsersListPage);