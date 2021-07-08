import React from 'react';
import { View } from 'react-native';

// const componentName = ({
//     children, style,
// }) => (
//     <View style={style}>
//         {children}
//     </View>
// );

export const removeItemFromArr=(arr,itemObj)=>{
   // console.log('getting array and object ',arr,'----- ',itemObj)
    let newArr=[];
    arr.map(item=>{
        if(item.Id==itemObj.Id){
            arr.pop(item)
        }
    })
console.log('getting array and object new Arr ',arr)
}


export const addItemFromArr=(arr,itemObj)=>{
    // console.log('getting array and object ',arr,'----- ',itemObj)
     let newArr=[];
     arr.map(item=>{
        if(item.Id==itemObj.Id){
            Object.assign(itemObj.item,{Qty:itemObj.item.Qty+1})
        }
    })
    
     console.log('getting array and object new Arr ',arr)
 }

//export default componentName;


