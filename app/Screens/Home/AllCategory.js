import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,StatusBar,ScrollView,FlatList,Image, Platform } from 'react-native';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import Header from '../../Component/Header/index'


const category=[{"name":"milk and dairy","type":0,"products":[{"name":"Milk"},{"name":"Curd"},{"name":"Bread"},{"name":"Milk"}]},
{"name":"Medicines","type":0,"products":[{"name":"Paracetamol"},{"name":"Citrazene"},{"name":"Dolo 650mg"},{"name":"Citrazene"}]},
{"name":"Fruits N Vagitables","type":0,"products":[{"name":"Tomato"},{"name":"Onion"},{"name":"Banana"},{"name":"carrot"}]},
{"name":"Fashion","type":0,"products":[{"name":"Jeans"},{"name":"Shirts"},{"name":"T-shirts"},{"name":"Shirts"}]},
{"name":"Grocery","type":0,"products":[{"name":"Sugar"},{"name":"Noodles"},{"name":"Rice"},{"name":"Noodles"}]}

]

class AllCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arr:[],
        isVisible:false
    };
  }
  componentDidMount(){
    this.filterObjects()
 
   
 
  }
//   UNSAFE_componentWillMount(){
//     this.setState({arr:this.state.arr.push(category[0].products)})
//   }

filterObjects=()=>{
    console.log('In filterObjects----',category)
    
    var array=[];
    category.map(item=>{
        if(item.name!='All'){

            item.products.map(subItems=>{
                array.push({"name":subItems.name})
               // this.setState({arr:array})
            })

        }
       
    })
    console.log('Get array after filtered ',array)
    this.setState({arr:array})
    if(category[0].name!='All'){
       
        category.unshift({"name":"All"})
    }
    else{
     this.setState({isVisible:false})
    }
  
    
}


upperView=()=>{
  
    return(

        <FlatList 
        style={{width:'100%',padding:10,borderWidth:0}}
        showsHorizontalScrollIndicator={false}
        data={category}
        horizontal={true}
        renderItem={item=>this.renderItem(item)}
        keyExtractor={item=>item.index}
    />
    )

}

buttonView=()=>{
   
    
        return(
    
            <TouchableOpacity style={styles.button} 
           // onPress={()=>{this.setState({isModalVisible:true})}}
            >
                <Text style={{color:'#fff',fontWeight:'700'}}>Sub Category {" "}</Text>
            </TouchableOpacity>
        )
    }

renderItem=(item)=>{
    console.log('item---- ',item)
    return(

        <TouchableOpacity style={styles.item} onPress={()=>item.item.name=="All"?this.filterObjects(): this.selectItemCategory(item)}>
        <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('../../assets/images/green/g1.png')}/>
        <Text >{item.item.name}</Text>
        </TouchableOpacity>
    )
}

selectItemCategory=(item)=>{
//console.log('selectItemCategory--- ',item)
this.setState({isVisible:true})
this.setState({arr:item.item.products})
//this.setState({selectCategory:item.product})

}


boxRender = (item) => {
    return (

        <TouchableOpacity style={styles.boxView} activeOpacity={0.4}>

            <View style={{ height: 25, width: 40, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'orangered' }}>5%</Text>
            </View>
            <Image style={{ height: 90, width: "100%", alignSelf: 'center' }} source={require('../../assets/images/green/g1.png')} />

            <View style={{ width: '100%', justifyContent:'center',padding:10}}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
            </View>
            <View style={styles.priceAndAdd}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "green" }}>$0.8/kg {' '}</Text>
                <TouchableOpacity style={styles.add}><Text style={{ color: "red" }}>+</Text></TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

categorySelectedView=()=>{
    console.log('Initial array ',this.state.arr)
    return(
    _get(this.state,'arr',[]).map(item=>{
       
        return(
            this.boxRender(item)
           
        )

    }
    )

    )
    
}


itemView=()=>{
    return(
         <TouchableOpacity style={[styles.item,{width:120}]} onPress={()=>this.dispatchToDetails(item)}>
               <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('../../assets/images/green/g1.png')}/>
               <Text>{item.name}</Text>
            </TouchableOpacity>
    )
}

dispatchToDetails=(item)=>{
console.log('dispatchToDetails---- ',item)
   // this.props.navigation.navigate('DetailsScreen',{"item":item})
}

  render() {
    console.log('Get array after filtered ',this.state.arr)
    return (
    
      <View style={styles.container}>
      <Header title="All Category" props={this.props} right={false}/>
      <View style={{width:'100%',justifyContent:'center',borderWidth:0}}>
      {this.upperView()}
      </View>
      <ScrollView contentContainerStyle={{borderWidth:0}}>
     
      <View style={{width:'100%',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',borderWidth:0}}>
      
      {
          this.state.arr.length>0?
          this.categorySelectedView():null
          }
      </View>
    
      </ScrollView>
      {this.state.isVisible?this.buttonView():null}
      {/* <View style={styles.categoryTitle}> */}
      </View>
    
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    categoryTitle:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
       
    },
    categoryView:{
        flexDirection:'row',
        flexWrap:'wrap',

    },
    item:{
        height:100,
        width:100,
        borderRadius:20,
        shadowColor:'#ccc',
        shadowOpacity:0.8,
        shadowOffset:{height:10,width:10},
        elevation:5,
        shadowRadius:5,
        backgroundColor:'#fff',
        alignItems:'center',
        alignItems:'center',
        margin:5,
        padding:10
        
    },
    boxView: {
        height: 210,
        width: '45%',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowColor: '#808080',
        padding: 10,
        margin: 5
    },
    priceAndAdd:
    {
        flexDirection: 'row',
        width: '100%',
        //padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
       // borderWidth:1
       
    },
    add: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 1,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.8,
        shadowColor: Platform.OS='ios'?'#ccc':'#000'

    },
    button: {
        width:'40%',
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:40,
        right: '30%', 
        bottom: '13%', 
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        shadowOpacity:0.8,
        shadowColor:'#ccc',
        padding:10,
        position: 'absolute', 
        
          
    },
})
const mapStateToProps = state => (
  
    {
    
      
  }
  
  );
  
 
  const mapDispatchToProps = dispatch => ({
      //register:(obj)=>{dispatch(registerAction(obj))},
    // commonAction:(data,url,constants,identifier,key)=>{dispatch(commonAction(data,url,constants,identifier,key))}
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllCategory)




// import React, { Component } from 'react';
// import { View, Text,StyleSheet,Platform } from 'react-native';
// import { connect } from 'react-redux';
// import _get from 'lodash/get';

// import Header from '../../Component/Header/index'


// const category=[{"name":"milk and dairy","type":0,"products":[{"name":"Milk"},{"name":"Curd"},{"name":"Bread"},{"name":"Milk"}]},
// {"name":"Medicines","type":0,"products":[{"name":"Paracetamol"},{"name":"Citrazene"},{"name":"Dolo 650mg"},{"name":"Citrazene"}]},
// {"name":"Fruits N Vagitables","type":0,"products":[{"name":"Tomato"},{"name":"Onion"},{"name":"Banana"},{"name":"carrot"}]},
// {"name":"Fashion","type":0,"products":[{"name":"Jeans"},{"name":"Shirts"},{"name":"T-shirts"},{"name":"Shirts"}]},
// {"name":"Grocery","type":0,"products":[{"name":"Sugar"},{"name":"Noodles"},{"name":"Rice"},{"name":"Noodles"}]}

// ]

// class AllCategory extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Header title="All Category" props={this.props} right={false}/>
//         <Text> AllCategory </Text>
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//     container:{
//         flex:1
//     },
//     categoryTitle:{
//         width:'100%',
//         flexDirection:'row',
//         justifyContent:'space-around',
//         alignItems:'center',
       
//     },

//     categoryView:{
//         flexDirection:'row',
//         flexWrap:'wrap',

//     },
//     /
    
// })

// const mapStateToProps = state => (
  
//     {
    
      
//   }
  
//   );
  
 
//   const mapDispatchToProps = dispatch => ({
//       //register:(obj)=>{dispatch(registerAction(obj))},
//     // commonAction:(data,url,constants,identifier,key)=>{dispatch(commonAction(data,url,constants,identifier,key))}
    
//   });
  
//   export default connect(mapStateToProps, mapDispatchToProps)(AllCategory)
