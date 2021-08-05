import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,TextInput,ScrollView } from 'react-native';
import {themeColor} from '../../Component/config';
import Header from '../../Component/Header'
import { connect } from 'react-redux';

class EditAccount extends Component {

    constructor(props) {
        super(props)
        this.state={
            name:'',email:'',mobile:'',image:''
        }

    }
componentDidMount(){
    console.log('Login data in Edit account****',this.props.loginData)
    let {Email,Id,MobileNo,Name} = this.props.loginData
    this.setState({name:Name})
    this.setState({mobile:MobileNo})
    this.setState({email:Email})
    // this.setState({name:Name})
}
    profileImageView = () => {
        return (
            <View style={styles.view1}>
                <TouchableOpacity style={{ height: 100, width: 100, borderRadius: 100, borderWidth: 0 }}>
                    <Image style={{ height: '100%', width: '100%', borderRadius: 80 }} source={require('../../assets/images/user.jpg')} />
                </TouchableOpacity>
                <Text style={{ fontWeight: '600', marginTop: 10 }}>{this.state.name}</Text>
            </View>

        )
    }
    listItems = (type) => {
        let {Email,Id,MobileNo,Name} = this.props.loginData
        let {mobile,email,name,image} = this.state;
        return (
            <View style={{ height: 50, width: '100%', justifyContent:'center', alignItems: 'flex-start' }}>
               <Text style={{marginLeft:10}}>{type}</Text>
               <TextInput style={{height:40,width:'90%',borderWidth:0,marginLeft:10,paddingLeft:10,color:'#000'}}
               placeholder={type}
               value={type=="Full Name"?name:type=="Mobile Number"?mobile:type=="Email"?email:"--"}
               onChangeText={(text)=>this.onChange(text,type)}
               placeholderTextColor={"#808080"}
               />
            </View>
        )

    }

    onChange=(text,type)=>{
        console.log('********',text,'**********')
        if(type=="Full Name"){
            this.setState({name:text})
   
        }
        else if(type=="Mobile Number"){
            this.setState({mobile:text})
          
        }
        else if(type=="Email"){
            this.setState({email:text})
        }
        else{
            this.setState({image:''})
        }
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
    style={{height:50,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:themeColor,borderRadius:5}}
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
            <Header props={this.props} title="Edit Account" right={false}/>
            <ScrollView style={{flex:1}}>
             <View style={{padding:10}}>
                {this.profileImageView()}
                {this.profileDetailsView()}
                </View>
                </ScrollView>
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


const mapStateToProps = state => (

    {

        // promoList: state.commonReducer.promoList,
        loginData:state.commonReducer.loginData,
         isLoad:state.commonReducer.isLoad,
    }

);

const mapDispatchToProps = dispatch => ({
    // commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
    // commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
    //  getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)