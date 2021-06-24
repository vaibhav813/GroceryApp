import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,TextInput } from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props)

    }

    profileImageView = () => {
        return (
            <View style={styles.view1}>
                <TouchableOpacity style={{ height: 100, width: 100, borderRadius: 100, borderWidth: 0 }}>
                    <Image style={{ height: '100%', width: '100%', borderRadius: 80 }} source={require('../../assets/images/user.jpg')} />
                </TouchableOpacity>
                <Text style={{ fontWeight: '600', marginTop: 10 }}>User Name</Text>
               

            </View>

        )
    }
    listItems = (type) => {
        return (
            <View style={{ height: 50, width: '100%', justifyContent:'center', alignItems: 'flex-start' }}>
               <Text style={{marginLeft:10}}>{type}</Text>
               <TextInput style={{height:40,width:'90%',borderWidth:0,marginLeft:10,paddingLeft:10,color:'#000'}}
               placeholder={type}
               placeholderTextColor={"#808080"}
               />
            </View>
        )

    }

    bottomViews=(type,screen)=>{
        return(
            <TouchableOpacity 
            style={{width:'100%',height:50,borderWidth:1,borderColor:'#ccc',justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:10}}
onPress={()=>{this.props.navigation.navigate(screen)}}            
            >
                <Text>{type}</Text>
               <Image style={{height:15,width:15}} source={require('../../assets/images/user/next.png')}/>
            </TouchableOpacity>
        )
    }

Button=()=>{
return(
    <TouchableOpacity 
    style={{height:50,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#00A300',borderRadius:5}}
    
    >
        
        <Text style={{color:'#fff',fontWeight:'700'}}>Save Changes</Text>
    </TouchableOpacity>
)

}

    profileDetailsView = () => {
        return (

            <View style={styles.view2}>
                {this.listItems('Full Name')}
                <View style={{ borderWidth:1, borderColor: '#ccc',marginTop:10,marginBottom:10}}/>
                {this.listItems('Mobile Number')}
                <View style={{ borderWidth:1, borderColor: '#ccc',marginTop:10,marginBottom:10}}/>
                {this.listItems('Email')}
                <View style={{ borderWidth:1, borderColor: '#ccc',marginTop:10,marginBottom:10}}/>
                 {this.Button()}
                 <View style={{ borderWidth:0, borderColor: '#ccc',marginTop:10,marginBottom:10}}/>
                {this.bottomViews("Change Password",'ChangePasswordScreen')}
                {this.bottomViews("Deactivate Account",'DeactiveAccountScreen')}
              
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.profileImageView()}
                {this.profileDetailsView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    view1: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
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
        backgroundColor: '#00A300',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconBackground:{ height: 40, width: 40, 
        borderRadius: 40, borderWidth: 0, 
        borderColor: '#00A300', justifyContent: 'center',
         alignItems: 'center', backgroundColor: '#fff' }
})