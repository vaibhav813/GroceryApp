import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,TextInput } from 'react-native';
import {themeColor} from '../../Component/config';
import Header from '../../Component/Header'

export default class ChangePass extends Component {

    constructor(props) {
        super(props)

    }

    // profileImageView = () => {
    //     return (
    //         <View style={styles.view1}>
    //             <TouchableOpacity style={{ height: 100, width: 100, borderRadius: 100, borderWidth: 0 }}>
    //                 <Image style={{ height: '100%', width: '100%', borderRadius: 80 }} source={require('../../assets/images/user.jpg')} />
    //             </TouchableOpacity>
    //             <Text style={{ fontWeight: '600', marginTop: 10 }}>User Name</Text>
               

    //         </View>

    //     )
    // }
    listItems = (type) => {
        return (
            <View style={{ height: 70, width: '100%', justifyContent:'center', alignItems: 'flex-start' }}>

               <Text style={{marginLeft:10}}>{type}</Text>
               <TextInput style={{height:40,width:'90%',borderWidth:0,marginLeft:10,paddingLeft:10,color:'#000'}}
               placeholder={"Enter "+type}
               placeholderTextColor={"#808080"}
               />
              
            </View>
        )

    }

    bottomViews=(type)=>{
        return(
            <TouchableOpacity style={{width:'100%',height:50,borderWidth:1,borderColor:'#ccc',justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:10}}>
                <Text>{type}</Text>
               <Image style={{height:15,width:15}} source={require('../../assets/images/user/next.png')}/>
            </TouchableOpacity>
        )
    }

Button=()=>{
return(
    <TouchableOpacity style={{height:50,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:themeColor,borderRadius:5}}>
        
        <Text style={{color:'#fff',fontWeight:'700'}}>Save Changes</Text>
    </TouchableOpacity>
)

}

    profileDetailsView = () => {
        return (

            <View style={styles.view1}>
                {this.listItems('Old Password')}
                <View style={styles.break}/>
                {this.listItems('New Password')}
                <View style={styles.break}/>
               
                 {this.Button()}
                 
              
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header props={this.props} title="Change Password" right={false}/>
                <View style={{padding:10}}>
                {this.profileDetailsView()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        //padding: 10
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
    edit: {
        height: 30,
        width: 110,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconBackground:{ height: 40, width: 40, 
        borderRadius: 40, borderWidth: 0, 
        borderColor: themeColor, justifyContent: 'center',
         alignItems: 'center', backgroundColor: '#fff' },
         break:{ borderWidth:1, width:'100%',borderColor: '#ccc',marginTop:0,marginBottom:10}
})