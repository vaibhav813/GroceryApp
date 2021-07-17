import * as React from 'react';
import { CommonActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}


export function pop(name) {
  navigationRef.current?.pop(name);
}
 export function reset(props,screen){
   console.log('In Reset ',props)
  props.navigation.dispatch(state => {
    // Remove the home route from the stack
    console.log('List of Screens --- ',state.routeNames)
     const routes = state.routes.filter(r => r.name !== screen);
    // const routes = state.routes.filter(r => r.name == screen);
     console.log('We have routes------ ',routes)
  
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });

  });

 }