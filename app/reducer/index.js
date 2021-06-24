
const initialState = {
    loginData:{}  
  }
     
  
  const loginReducer = (state = initialState, action) => {
        console.log('Reducer ------',action)
      switch(action.type) {
        
  
        case `${action.identifier}_INIT`:
         
         // console.log('in INIT reducer ', action);
          return ({
            ...state,
            type: action.type,
           // isFetching: true,
            [`${action.key}`]:[],
          });
        case `${action.identifier}_SUCCESS`:
        
         // console.log('in success reducer');
          return ({
            ...state,
            type: action.type,
           // isFetching: false,
            [`${action.key}`]: action.data,
          });
        case `${action.identifier}_ERROR`:
      //   console.log('in reducer ', action);
          return ({
            ...state,
            type: action.type,
            //isFetching: false,
            error: action.error,
          });
  
        
      case 'IS_LOADING':
      return {
      ...state,
      isLoad:action.data
      }; 
  
      default:
      return state;
      }
      }
      export default loginReducer;