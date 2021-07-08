import React from 'react';
import { View,StyleSheet } from 'react-native';
import {VenderImageInfo} from './SkeltonRow'

export const VenderListSkelton = (props) => {
    return(
       
        props.length.map(item=>{
            return(
                <View style={styles.skeltonView}>
                <VenderImageInfo/>
                </View>
            )
        })
        
         
         
    )
}


const styles=StyleSheet.create({
    skeltonView:{
   width:'100%',
    backgroundColor:'#fff',justifyContent:'center',
    borderRadius:10,
    shadowOpacity:0.8,
    shadowRadius:10,
    shadowColor:'#ccc',
    elevation:10,
    marginTop:15,
    padding:15

}
})