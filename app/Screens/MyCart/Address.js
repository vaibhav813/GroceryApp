import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {themeColor} from '../../Component/config';

export default class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address:false,
            name:'',
            addr:'',
            addrType:'Office',
            listObj: [
                { "id":1,"title": "Home","name":'' ,"details": "91,bhagirath nagar,gopalpura by pass,jaipur,Rajasthan", "isSelect": "true" },
                { "id":2,"title": "Work", "name":"","details": "95,bhagirath nagar,gopalpura by pass,jaipur,Rajasthan" , "isSelect": "false"},
                { "id":3,"title": "Work",  "name":"","details": "100,bhagirath nagar,gopalpura by pass,jaipur,Rajasthan" , "isSelect": "false"}
            ]
        }

    }

    selectAddress = (item) => {
        // if(item && item.item && item.item.isSelect=="true"){
        //     Object.assign(item.item, { "isSelect": "false" })
        // }
        // else{
        //     Object.assign(item.item, { "isSelect": "true" })
        // }

let newArr=[];
        this.state.listObj.map(listItem=>{
            console.log('Id--- ',listItem.id,'==',item.item.id)
             if(listItem.id==item.item.id){
            
                Object.assign(item.item, { isSelect: "true" });
                 newArr.push(item.item)
                
             }
             else {
                console.log(' IN ELSE ');
                Object.assign(listItem, { isSelect: "false" })
                newArr.push(listItem)

                 
            
             }

        })
   
        this.setState({listObj:newArr})

    }

    replaceItem=()=>{
    const newArrayList = [];
    this.state.listObj.forEach(obj => {
      if (!newArrayList.some(o => o.id === obj.id)) {
        newArrayList.push({...obj});
      }
    });
 
    this.setState({listObj: newArrayList});  

    }



    renderItem = (item) => {
     console.log('Item is ',item)

        return (
            <TouchableOpacity style={[styles.listItems,{borderColor: item.item.isSelect == "true" ? themeColor : '#ccc', }]}

                onPress={() => this.selectAddress(item)}>

               

                <View style={{ width: 200 }}>
                <Text style={{ fontWeight: '600' }}>{item.item.title}</Text>
                <Text>{item.item.name}</Text>
                <Text>{item.item.details}</Text>
                </View>
                {item.item.title=="Home"?
                <View style={{height:'100%',width:60, alignItems:'center',justifyContent:'flex-start'}}>
               <Text style={{color:themeColor,padding:5,backgroundColor:'#e6fffa',width:"100%", borderRadius:5,borderWidth:1,borderColor:themeColor}}>default</Text>
                </View>
                :
                <View style={{height:'100%',width:60, alignItems:'center',justifyContent:'flex-start'}}/>
    }

            </TouchableOpacity>
        )


    }

    addressView = () => {
        return (
            <FlatList
                style={{ width: '100%', height: '100%' }}
                data={this.state.listObj}
                renderItem={item => this.renderItem(item)}
                keyExtractor={item => item.id}
            />
        )
    }

    typeFunction=(type)=>{
if(type=='Address'){
    this.addAddressFunc();
}
else if(type=='setAddress'){
this.setAddressFunc()
}
else{
    this.continue()
}

    }


    addAddressFunc=()=>{
    
     this.setState({address:true})

    }
    continue=()=>{

       

    }

    addButton=(text,type)=>{
        return(

            <TouchableOpacity style={styles.buttonView} onPress={()=>{this.typeFunction(type)}}>
           <Text style={{color:'#fff',fontWeight:'600'}}>{text}</Text>
            </TouchableOpacity>

        )
    }

setAddressFunc=()=>{

    if(this.state.addr=="" || this.state.addrType==""|| this.state.name==""){
        alert("All fields are require.")
    }
    else{

       
        let obj={
            "id":this.state.listObj[this.state.listObj.length-1].id+1,
            "title":this.state.addrType==""?this.state.name:this.state.addrType,
            "name":this.state.name,
            "details":this.state.addr,
            "isSelect":"false"
        }
        this.state.listObj.push(obj)
       this.setState({listObj:this.state.listObj})
        this.setState({address:false})
    }
    

}

  setAddress=()=>{
return(


    
    <View style={{height:'30%',width:'100%'}}>
        <TextInput style={{height:50,borderWidth:1,borderColor:'#ccc',padding:10,marginTop:10,borderRadius:5,color:'#000'}}
        onChangeText={text=>this.setState({addrType:text})}
        value={this.state.addrType}
        placeholderTextColor={"#808080"}
         placeholder="Enter Address Type"
    />

    <TextInput style={{height:50,borderWidth:1,borderColor:'#ccc',padding:10,marginTop:10,borderRadius:5}}
       onChangeText={text=>this.setState({name:text})}
       value={this.state.name}
       placeholderTextColor={"#808080"}
        placeholder="Enter Full Name"
        />

    <TextInput style={{height:50,borderWidth:1,borderColor:'#ccc',padding:10,marginTop:10,borderRadius:5}}
    onChangeText={text=>this.setState({addr:text})}
    value={this.state.addr}
    placeholderTextColor={"#808080"}
    placeholder="Enter Full Address"
    />
    </View>
)

  }

    render() {
        console.log('List Object ',this.state.listObj)
        return(
        this.state.address?
              <View style={styles.container}>
               { this.setAddress()}
               { this.addButton('Add',"setAddress")}
                </View>
                :
       
       
       
            <View style={styles.container}>
               
                {this.addressView()}
                {this.addButton('Add',"Address")}
               {this.addButton('Countinue',"Coutinue")}
                
            </View>
          
       
       
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    listItems:{
          width: '100%', justifyContent: 'space-around', flexDirection:'row',
            alignItems: 'center', borderWidth: 2,marginTop:10,padding:10,
            borderRadius:5
    },
    buttonView:{
        height:50,width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themeColor,
        borderRadius:5,marginTop:10

    }

})