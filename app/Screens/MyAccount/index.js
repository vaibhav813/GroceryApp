import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {themeColor} from '../../Component/config';
import {clearStorage} from '../../Component/Storage/index'
import Header from '../../Component/Header'
import {reset} from '../../Component/RootNavigation'



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
                <TouchableOpacity style={styles.edit} onPress={()=>{this.props.navigation.navigate('EditScreen')}}>
                    <Image source={require('../../assets/images/edit.png')} style={{ height: 15, width: 15 }} />
                    <View style={{ width: 10 }} />
                    <Text style={{ color: '#fff' }}>Edit Profile</Text>
                </TouchableOpacity>

            </View>

        )
    }

    multiFunc=async(type)=>{
        console.log('Clicked function----',type)
        if(type=="Logout"){

            clearStorage()
           // reset(this.props,"Login")
            this.props.navigation.navigate('Login')
        }
        else if(type=="My Address")
        {
            this.props.navigation.navigate('AddressScreen')
        }
        else{
            console.log('Clicked function Else----',type)
        }
    }

    listItems = (type,color) => {
        return (
            <TouchableOpacity style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }} onPress={()=>{this.multiFunc(type)}}>
                <View style={{ flex: 0.2, borderWidth: 0, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.iconBackground,{backgroundColor:color}]}>
                        {type == "Promos" ?
                            <Image source={require('../../assets/images/user/discount1.png')} style={{ height: 25, width: 25, backgroundColor: themeColor }} />
                            :
                            type == "My Address" ?
                                <Image source={require('../../assets/images/user/address.png')} style={{ height: 25, width: 25, backgroundColor: '#000' }} />
                                :
                                type == "Terms,Privacy And Policy" ?
                                    <Image source={require('../../assets/images/user/terms.png')} style={{ height: 25, width: 25, }} />
                                    :
                                    type == "Help & Support" ?
                                        <Image source={require('../../assets/images/user/phone.png')} style={{ height: 25, width: 25 }} />
                                        :

                                        <Image source={require('../../assets/images/user/lock.png')} style={{ height: 25, width: 25 }} />
                        }

                    </View>
                </View>

                <View style={{ flex: 0.7, height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>

                    <Text style={{ fontWeight: '500' }}>{type}</Text>
                </View>
                <View style={{ flex: 0.1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{height:15,width:15}} source={require('../../assets/images/user/next.png')}/>
                </View>
            </TouchableOpacity>
        )

    }

    profileDetailsView = () => {
        return (

            <View style={styles.view2}>
                {this.listItems('Promos','#fff')}
                {this.listItems('My Address','#fff')}

                {this.listItems('Terms,Privacy And Policy','#fff')}
                {this.listItems('Help & Support','#fff')}
                {this.listItems('Logout','#fff')}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
            <Header props={this.props} title="My Account" right={false}/>
                {this.profileImageView()}
                {this.profileDetailsView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
      
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
        backgroundColor: themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconBackground:{ height: 40, width: 40, 
        borderRadius: 40, borderWidth: 0, 
        borderColor: themeColor, justifyContent: 'center',
         alignItems: 'center', backgroundColor: '#fff' }
})