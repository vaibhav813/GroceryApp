import { createStore, combineReducers,applyMiddleware } from 'redux';


import commonReducer from '../reducer/index';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage' 
import AsyncStorage from '@react-native-community/async-storage';



const rootReducer = combineReducers(
{ 
   
    commonReducer:commonReducer,
   // patrolOrderData:orderReducer,
}
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)


  export default () => {
    let store = createStore(persistedReducer,applyMiddleware(thunk))
    let persistor = persistStore(store)

    if (module.hot) {
        module.hot.accept(() => {
          // This fetch the new state of the above reducers.
          const nextRootReducer = require('../reducer/index');
          store.replaceReducer(
              persistReducer(persistConfig, nextRootReducer)
          );
        });
      }


    return { store, persistor }
  }

// const store = () => {
   

// return createStore(rootReducer,applyMiddleware(thunk));
// }



//export default store;