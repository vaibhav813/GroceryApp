import { createStore, combineReducers,applyMiddleware } from 'redux';


import commonReducer from '../reducer/index';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
{ 
   
    commonReducer:commonReducer,
   // patrolOrderData:orderReducer,
}
);
const store = () => {
   

return createStore(rootReducer,applyMiddleware(thunk));
}



export default store;