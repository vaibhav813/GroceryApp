import React, { Component,PureComponent } from 'react';
import { View, Text,StyleSheet,ScrollView } from 'react-native';
import VenderListComp from '../Vender/index'
import Header from '../../Component/Header/index'
import _get from 'lodash/get'
import { connect } from 'react-redux';

class VenderList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }
  componentDidMount(){
      console.log('Component Did Mount------ ',this.props)
      
  }

  render() {
    console.log('In Render------ ',this.props.isLoad)
    return (
      <View style={styles.container}>
      <Header props={this.props} title={this.props.route.params.item.Name} right={false}/>
      <ScrollView contentContainerStyle={{flex:1}}>
      <VenderListComp props={this.props} id={_get(this.props.route,'params.item.Id',12)} length={[1,2,3,4]}/>
      </ScrollView>
      </View>
    );
  }
}

const styles= StyleSheet.create({
    container:{
        flex:1
    }
})


const mapStateToProps = state => (

    {

        //promoList: state.commonReducer.promoList,
        isLoad: state.commonReducer.isLoad,
    }

);

const mapDispatchToProps = dispatch => ({
    
  //  getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenderList)