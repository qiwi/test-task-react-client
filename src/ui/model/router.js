import { connectRouter, routerMiddleware as rm } from 'connected-react-router';
import history from '../../storage/history';

export const routerReducer = connectRouter(history);
export const routerMiddleware = rm(history);
