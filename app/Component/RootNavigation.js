import * as React from 'react';
import { CommonActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
 export function reset(props,screen){
   console.log('In Reset ',props)
  props.navigation.dispatch(state => {
    // Remove the home route from the stack
    console.log('states --- ',state)
    const routes = state.routes.filter(r => r.name !== screen);
  
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });

 }