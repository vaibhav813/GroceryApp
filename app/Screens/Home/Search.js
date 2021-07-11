import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,Image } from 'react-native';
import Header from '../../Component/Header/index' 

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
              
            />
        </View>
    )

}

  render() {
    return (
      <View style={styles.container}>
      <Header title="Search" props={this.props} right={false}/>
          {this.searchRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    search: {
        width: '100%',
        height: 40,
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