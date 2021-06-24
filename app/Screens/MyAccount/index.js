import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
    listItems = (type,color) => {
        return (
            <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}>
                <View style={{ flex: 0.2, borderWidth: 0, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.iconBackground,{backgroundColor:color}]}>
                        {type == "Promos" ?
                            <Image source={require('../../assets/images/user/discount1.png')} style={{ height: 25, width: 25, backgroundColor: '#00A300' }} />
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
            </View>
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