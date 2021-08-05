import React, { Component } from 'react';

import { View, Text,StyleSheet,TextInput,Image,FlatList,TouchableOpacity } from 'react-native';
import Header from '../../Component/Header/index' 

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:['Vaibhav','vegitables','Groceries','jeans','kurta','top','tshirts','shirt'],
      searchList:[],
      textVal:''

    };
  }
  onChangeText=(text)=>{
    console.log(text)
    if(text==''){
      this.setState({searchList:[]})
    }
    else{
      this.setState({textVal:text})
      this.checkValueFromList(text)
    }
   
  
  }

  checkValueFromList=(text)=>{
    const {list}=  this.state;
    let arr=[];
  list.map(string=>{
      if(string.toLocaleLowerCase().includes(text)){
       arr.push(string)
      }
      
    })
    this.setState({searchList:arr})
   // console.log('get text val---- ',arr)


  }

  searchRender = () => {
    return (
        <View style={styles.search}>
        
            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }} >
                <Image style={{ height: 15, width: 15 }} source={require('../../assets/images/search.jpg')} />
            </View>
            <TextInput
                style={{ flex: 0.9, height: '100%', color: '#000' }}
                placeholder="Search category"
                placeholderTextColor={"#808080"}
                onChangeText={text=>{this.onChangeText(text.toLowerCase())}}
                defaultValue={this.state.textVal}
            />
        </View>
    )

}

renderItem=(item)=>{
 // console.log('We have item value---- ',item)
return(
  <TouchableOpacity style={{width:'100%',height:60,alignItems:'flex-start',justifyContent:'center'}}>
  <Text>{item.item}</Text>

  </TouchableOpacity>
)
}
seperator=()=>{
  return(
    <View style={{borderWidth:0.5,width:'100%',borderColor:'#ccc'}}/>
  )
}



flatListView=()=>{
  return(
    <FlatList 
data={this.state.searchList}
renderItem={item=>this.renderItem(item)}
ItemSeparatorComponent={()=>this.seperator()}
keyExtractor={(item,index)=>{
  return index.toString()
}}
style={{flex:1,padding:10}}
    />
  )
}

  render() {
    return (
      <View style={styles.container}>
     
      <Header title="Search" props={this.props} right={false}/>
      <View style={{padding:10,flex:1}}>
          {this.searchRender()}
          {this.flatListView()}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
      
    },
    search: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 5,
            height: 8
        },
        elevation: 5,
        shadowColor: '#ccc',
        backgroundColor: '#fff'
    },
})