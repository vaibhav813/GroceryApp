import React,{Component} from 'react';
import  {View,Text,TouchableOpacity,StyleSheet} from 'react-native';

export default class Home extends Component{
constructor(props){
super(props)

}

render(){
    return(
<View style={styles.container}>
    <Text>Details Products</Text>
</View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})