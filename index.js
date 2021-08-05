import { AppRegistry } from 'react-native';
import React from 'react';

import { Image, StatusBar,BackHandler,StyleSheet,View,Text, } from 'react-native';
import {Button} from 'react-native-paper'

import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import configureStore from './app/store/index';
import { Provider } from 'react-redux';
import HomeScreen from './app/Screens/Home/index';
import Register from './app/Screens/Register/index';
import Login from './app/Screens/Login/Login';
import MyCart from './app/Screens/MyCart/index'
import MyAccount from './app/Screens/MyAccount/index'
import { navigationRef } from './app/Component/RootNavigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyOrder from './app/Screens/MyOrder/index';
import Progress from './app/Screens/MyOrder/progress';
import Cancelled from './app/Screens/MyOrder/cancelled';
import Check from './app/Screens/check';
import EditScreen from './app/Screens/MyAccount/EditAccount'
import ChangePass from './app/Screens/MyAccount/ChangePass';
import DeactiveAccount from './app/Screens/MyAccount/DeactiveAccount';
import CategoryScreen from './app/Screens/Home/Catagory';
import AddressScreen from './app/Screens/MyCart/Address';
import SeeMoreScreen from './app/Screens/Home/Seemore';
import SplashScreen from './app/Screens/Splash/index'
 import {themeColor} from '././app/Component/config'
 import VenderListScreen from '././app/Screens/Vender/VenderList'
 import VenderListComp from '././app/Screens/Vender/index'
 //import VendorCategory from '././app/Screens/Category/VendorCategory';
import AllCategoryScreen from '././app/Screens/Home/AllCategory'
import Search from '././app/Screens/Home/Search'
import Details from '././app/Screens/Home/Details'
import ProductDetails from '././app/Screens/Home/ProductDetails'
import ConfirmCart from '././app/Screens/MyCart/ConfirmCart'
import Auth from './app/Screens/index'
import { connect } from 'react-redux';
import WishListScreen from './app/Screens/MyCart/WishListScreen'
import CompanyInfo from './app/Screens/MyAccount/CompanyInfo'

import { PersistGate } from 'redux-persist/integration/react'


import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// const store = configureStore()
const { store, persistor } = configureStore();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const tabColor = themeColor;
function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
           // initialRouteName="AddressScreen"
            screenOptions={{
                headerStyle: { backgroundColor: tabColor },
                headerTintColor: '#fff',
                headerShown:false,
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}

            
            >

            <Stack.Screen
            
                name="HomeScreen"
                component={HomeScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={
                    {
                        title: 'Home',
                        headerShown:false,
                    }} 
                    />

            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'Category' }} />

            <Stack.Screen
                name="SeeMoreScreen"
                component={SeeMoreScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'See More' }} />


              <Stack.Screen
                name="AllCategoryScreen"
                component={AllCategoryScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'All Category' , headerShown:false}} />

                 <Stack.Screen
                name="VenderListDetails"
                component={VenderListScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'Home',headerShown:false }} />

             <Stack.Screen
                name="SearchScreen"
                component={Search}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'Search' }} />

             <Stack.Screen
                name="DetailScreen"
                component={Details}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'Detail' }} />

           <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetails}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'Detail' }} />


            <Stack.Screen
                name="CartScreen"
                component={MyCart}
                options={{ title: 'Cart' }} />

            <Stack.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{ title: 'Address' }} />

            <Stack.Screen
                name="ConfirmCartScreen"
                component={ConfirmCart}
                options={{ title: 'Confirm Cart' }} />

           <Stack.Screen
                name="WishListScreen"
                component={WishListScreen}
                options={{ title: 'Wish List' }} />
        </Stack.Navigator>
    );
}

const venderScreens = ()=>{
    return (
        <Stack.Navigator
            initialRouteName="AllCategoryScreen"
            screenOptions={{
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: '#fff',
                
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>
           

        </Stack.Navigator>
    );
}


const tabStackOrders = () => {
    return (
        <TopTab.Navigator

            tabBarOptions={{
                tabBarPosition: 'top',
                swipeEnabled: true,
                animationEnabled: true,
                activeTintColor: themeColor,
                labelStyle: { fontSize: 15, textAlign: 'center' },
                tabStyle: { marginTop: 0 },
                style: { backgroundColor: '#fff' },
                indicatorStyle: {
                    borderBottomColor: themeColor,
                    borderBottomWidth: 2,
                }
            }}
        >
            <TopTab.Screen name="Completed" component={MyOrder} />
            <TopTab.Screen name="Progress" component={Progress} />
            <TopTab.Screen name="Cancelled" component={Cancelled} />

        </TopTab.Navigator>
    )
}


function CartStack() {
    return (
        <Stack.Navigator
            initialRouteName="CartScreen"
            screenOptions={{
                headerStyle: { backgroundColor: themeColor },
                
                headerTintColor: '#fff',
                headerShown:false,
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>
            <Stack.Screen
                name="CartScreen"
                component={MyCart}
                options={{ title: 'Cart' }} />

         <Stack.Screen
                name="WishListScreen"
                component={WishListScreen}
                options={{ title: 'Wish List' }} />


            <Stack.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{ title: 'Address' }} />


              <Stack.Screen
                name="ConfirmCartScreen"
                component={ConfirmCart}
                options={{ title: 'Confirm Cart' }} />

        </Stack.Navigator>
    );
}

function MyOrdersStack() {
    return (
        <Stack.Navigator
            initialRouteName="MyOrderScreen"
            screenOptions={{
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: '#fff',
                
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>
            <Stack.Screen
                name="MyOrderScreen"
                // component={MyOrderScreen}
                component={tabStackOrders}
                options={{ title: 'My Orders' }} />

        </Stack.Navigator>
    );
}
function MyCheckStack() {
    return (
        <Stack.Navigator
            initialRouteName="TestScreen"
            screenOptions={{
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: '#fff',
                
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>
            <Stack.Screen
                name="CheckScreen"
                component={Check}
                options={{ title: 'Check' }} />

        </Stack.Navigator>
    );
}

function MyAccountStack() {
    return (
        <Stack.Navigator
            initialRouteName="MyAccountScreen"
            screenOptions={{
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: '#fff',
                headerShown:false,
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>
            <Stack.Screen
                name="CartScreen"
                component={MyAccount}
                options={{ title: 'Account' }} />
            <Stack.Screen
                name="EditScreen"
                component={EditScreen}
                options={{ title: 'Edit' }} />
            <Stack.Screen
                name="ChangePasswordScreen"
                component={ChangePass}
                options={{ title: 'Change Password' }} />
            <Stack.Screen
                name="DeactiveAccountScreen"
                component={DeactiveAccount}
                options={{ title: 'Deactive Account' }} />

<Stack.Screen
                name="CompanyInfoScreen"
                component={CompanyInfo}
                options={{ title: 'Deactive Account' }} />



        </Stack.Navigator>
    );
}


// const getToken=async()=>{
// const token = await getData('token');
// console.log('**********Token In Rooot********* ',token)
// return token;
// }




const RegisterLoginStack = () => {
    
  
     return (

        
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="light-content" backgroundColor={themeColor} />
          
           <Stack.Navigator
               initialRouteName="Auth"
                // initialRouteName= {token!=null?"tabHome":"Login"}
              //  initialRouteName= "CheckScreen"
                screenOptions={{
                    headerStyle: { backgroundColor: tabColor },
                    headerTintColor: '#fff',
                    headerLeft: null,
                    gesturesEnabled: false,
                    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
                
                }}
            >

           <Stack.Screen
                    name="Register"
                    component={Register}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ title: 'Sign Up' }} />


                <Stack.Screen
                    name="Login"
                    component={Login}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ title: 'Login' }} />

            <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{title:'Splash'}} />
                
             

                <Stack.Screen
                    name="tabHome"
                    component={tabStacks}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ headerShown: false }}
                // options={{ title: 'Home' }}
                />

                 {/* <Stack.Screen
                    name="tabHome"
                    component={AllTabs}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ headerShown: false }}
                // options={{ title: 'Home' }}
                /> */}

              <Stack.Screen
                    name="Auth"
                    component={Auth}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ headerShown: false }}
                // options={{ title: 'Home' }}
                />
                <Stack.Screen
                    name="CheckScreen"
                    component={Check}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ headerShown: false }}
                 options={{ title: 'Check' }}
                />
                   </Stack.Navigator>
            
             



         
        </NavigationContainer>



    )

    
    

}


const handleBackButton=()=>{
    console.log('*****************In handle back button*****************')
    props.navigation.goBack();
    return true;
}

const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    style: {backgroundColor: 'white' },
}



//  const AllTabs=()=> {
//   return (
//     <Tab.Navigator tabBar={(props) => <TabBar {...props} />} >
 
//       <Tab.Screen 
//         name="HomeStack" 
//         component={HomeStack} />
 
//       <Tab.Screen 
//         name="CartStack" 
//         component={CartStack} />
 
//       <Tab.Screen 
//         name="MyOrdersStack" 
//         component={MyOrdersStack} />

// <Tab.Screen 
//         name="MyAccountStack" 
//         component={MyAccountStack} />
 
//     </Tab.Navigator>
//   );
// }



const tabStacks = () => {
    return (

        <Tab.Navigator
             initialRouteName="HomeScreen"
            tabBarOptions={{
                activeTintColor: tabColor,
                inactiveTintColor: 'gray',
            }}
           // tabBarOptions={customTabBarStyle}
            tabStacks
            backBehavior={"history"}
           // tabBar={(props) => <TabBar {...props} />}
          
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) =>

                    (
                        color == tabColor ?
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain', }} source={require('./app/assets/images/icons/shop_green.png')} />
                            :
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./app/assets/images/icons/shop.jpeg')} />
                    ),
                }}
                 />

            <Tab.Screen
                name="CartStack"
                component={CartStack}
                options={{
                    tabBarLabel: 'Cart',
                    //tabBarBadge:3,
                    tabBarIcon: ({ color, size }) => (
                        color == tabColor ?
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./app/assets/images/icons/cart_green.png')} />
                            :
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./app/assets/images/icons/cart.jpeg')} />
                    ),
                }} 
               

                />
                


            <Tab.Screen
                name="MyOrdersStack"
                component={MyOrdersStack}
                options={{
                    tabBarLabel: 'My Orders',
                    tabBarIcon: ({ color, size }) => (
                        color == tabColor ?

                       
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/orders_green.png')} />
                          
                    
                            :
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/orders.png')} />
                    ),
                }} 

       

                />

            <Tab.Screen
                name="MyAccountStack"
                component={MyAccountStack}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        color == tabColor ?
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/account_green.png')} />
                            :
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/account.png')} />
                    ),
                }} 

       


                />




           
        </Tab.Navigator>


    )

}

const RNRedux = () => {
    
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

            { 
               
                    RegisterLoginStack()
              
                
                }
                </PersistGate>

        </Provider>
    );
}

// const RNRedux = () => (
//   <Provider store = { store }>
//       <NavigationContainer>
//      <Stack.Navigator>
//      {/* <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/> */}
//        <Stack.Screen name="Home" component={Home} />
//        {/* <Stack.Screen name="Details" component={DetailsUser} options={{ headerShown: false}}/> */}
//       {/* <Stack.Screen name="Confirm" component={Confirm} options={{ title: 'Confirm Order' }}/>

//        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/> */}
//      </Stack.Navigator>
//    </NavigationContainer>
//   </Provider>
// )






//export default RNRedux

AppRegistry.registerComponent(appName, () =>  RNRedux);