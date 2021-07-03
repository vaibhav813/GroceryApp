import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";

import { connect } from "react-redux";
import { imageBaseUrl } from "../../Component/config";
import _get from "lodash/get";
import { ImageWithText } from "../../Component/SkeltonRow";
import {
  commonActionGet,
  commonActionPost,
  getTypeListAction,
} from "../../action/commonAction";
import { themeColor } from "../../Component/config";
import Header from '../../Component/Header/index'

const categoryHeight = "21%";

class Seemore extends Component {
  constructor(props) {
    super(props);
    this.state = { listData: [] };
  }

  componentDidMount() {
    //  console.log('Component did mount ',this.props.route.params.list)
    // this.setState({listData:this.props.route.params.list})
    this.getAllCategories();
  }

  getAllCategories = () => {
    const constants = {
      init: "GET_CAT_LIST_ALL_INIT",
      success: "GET_CAT_LIST_ALL_SUCCESS",
      error: "GET_CAT_LIST_ALL_ERROR",
    };
    const key = "catListAll";
    const identifier = "GET_CAT_LIST_ALL";
    const url = "/categorylist";
    const obj = {
      uriData: 2,
    };
    const type = "?type=";
    this.props.getTypeListAction(obj, url, constants, identifier, key, type);
    // this.props.commonActionGet(obj, url, constants, identifier, key)
  };

  categoryView = () => {
    return (
      <View style={styles.categoryView}>
      
        {this.props.catListAll && _get(this.props, "catListAll", []).length == 0 ? (
          <ImageWithText />
        ) : (
          <FlatList
            style={{ height: "100%", width: "100%" }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
            data={_get(this.props, "catListAll", [])}
            renderItem={(item) => this.categoryItems(item)}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  };

  navigate = (screen, params) => {
    this.props.navigation.navigate(screen, params);
  };

  categoryItems = (item) => {
    console.log("Items---- ", item);
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => {
          this.navigate("VenderListDetails", { item: item.item });
        }}
      >
        <View style={{ flex: 0.2 }}>
          <Image
            source={{ uri: imageBaseUrl + item.item.ImgLogo }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 0,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flex: 0.8, paddingLeft: 10 }}>
          <Text style={{ color: "#000", fontWeight: "700" }}>
            {item.item.Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return <View style={styles.container}>
    <Header props={this.props} title="See More" right={false}/>
    {this.categoryView()}
    </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // padding: 5,
  },
  itemView: {
    // height:90,
    width: "100%",
    flexDirection: "row",
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    elevation: 5,
    shadowRadius: 8,
    shadowColor: "#ccc",
    // justifyContent:'center',
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    //borderWidth:1
  },
  categoryView: {
    flex: 1,
    alignItems: "center",
    marginTop: 0,
  },
});

const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  catListAll: state.commonReducer.catListAll,
});

const mapDispatchToProps = (dispatch) => ({
  // commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
  // commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
  getTypeListAction: (obj, url, constants, identifier, key, type) =>
    dispatch(getTypeListAction(obj, url, constants, identifier, key, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seemore);
