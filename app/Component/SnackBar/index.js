import React from 'react';
import { Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import {themeColor} from '../../Component/config'; 
import {connect,useStore} from 'react-redux';
import {navigate,navigationRef} from '../../Component/RootNavigation'



  const SnackBar = (
   params
) => {
 //   const store = useStore()
  const  showSnackBar=()=>{
     console.log('Get text in Snack bar ADD TO CART********-----',navigationRef.dangerouslyGetState)
        //    console.log('Get text in Snack bar ADD TO CART********-----',store.getState().commonReducer.addtocart)
        let color = params.color||themeColor;

        Snackbar.show({
             text: params.text,
            backgroundColor:color,
           // backgroundColor:themeColor,
           duration: Snackbar.LENGTH_INDEFINITE,
            action: {
                text: 'OK',
                textColor: '#fff',
                onPress: () => { /* Do something. */ },
  },
          });
    
}

    
    return(
    <View>
       { showSnackBar()
           }
    </View>
)};




// const mapStateToProps = (state) => ({
//     //promoList: state.commonReducer.promoList,
    
//     isLoad: state.commonReducer.isLoad,
//     addtocart: state.commonReducer.addtocart,
//   });
  
//   const mapDispatchToProps = (dispatch) => ({
//     // getCartSaveList: (data, identifier, key) =>
//     //   dispatch(getDataSaveList(data, identifier, key)),
//     // commonActionPost: (obj, url, constant, identifier, key) => {
//     //   dispatch(commonActionPost(obj, url, constant, identifier, key));
//     // },
//     // getCommonDataAction: (url, constants, identifier, key, type) => {
//     //   dispatch(getCommonDataAction(url, constants, identifier, key, type));
//     // },
//   });
  
  

export default  SnackBar
// export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
