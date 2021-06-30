import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,TextInput } from 'react-native';
import {themeColor} from '../../Component/config';

export default class DeactiveAccount extends Component {

    constructor(props) {
        super(props)

    }

  
 

Button=()=>{
return(
    <TouchableOpacity style={{height:50,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:themeColor,borderRadius:5}}>
        
        <Text style={{color:'#fff',fontWeight:'700'}}>Confirm Deactivate</Text>
    </TouchableOpacity>
)

}
infoUser=(type,value)=>{
    return(
        <View style={{height:60,width:'100%',justifyContent:'center',alignItems:'flex-start'}}>
         <Text style={{fontWeight:'600'}}>{type}</Text>
         <Text style={{}}>{value}</Text>
        </View>
    )
}
listItems = (type) => {
    return (
        <View style={{ height: 50, width: '100%', justifyContent:'center', alignItems: 'flex-start' }}>
           <Text >{type}</Text>
           <TextInput style={{height:40,width:'90%',borderWidth:0,paddingLeft:5,color:'#000'}}
           placeholder={"Enter "+type}
           placeholderTextColor='#ccc'
           />
        </View>
    )

}


    profileDetailsView = () => {
        return (

            <View style={styles.view1}>
           {this.infoUser('Email','vaibhavgupta@gmail.com')}
                <View style={styles.break}/>
                {this.infoUser('Mobile Number','9987665342')}
                <View style={styles.break}/>
                {this.listItems('Password')}
                <View style={styles.break}/>
                 {this.Button()}
                
               
              
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
               
                {this.profileDetailsView()}
                {/* <View style={styles.view2}/> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    view1: {
        height: '40%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth: 1
    },
    view2: {
        height: '60%',
        width: '100%',
        // borderWidth: 1
    },
    break:{ borderWidth:1, width:'100%',borderColor: '#ccc',marginTop:0,marginBottom:10}
   
})