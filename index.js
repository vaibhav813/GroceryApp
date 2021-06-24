
// import {AppRegistry} from 'react-native';
// // import App from './App';
// import App from './app/Screens/Home/index';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);



/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import { Image, StatusBar } from 'react-native';

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


import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';



const store = configureStore()
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const tabColor = "#00A300";
function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: tabColor },
                headerTintColor: '#fff',
                
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>

            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={
                    {
                        title: 'Home',
                        
                    }} />

            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'Category' }} />

            <Stack.Screen
                name="SeeMoreScreen"
                component={SeeMoreScreen}
                headerTitleStyle={{ alignSelf: 'center' }}
                options={{ title: 'All Categories' }} />


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
                activeTintColor: "#00A300",
                labelStyle: { fontSize: 15, textAlign: 'center' },
                tabStyle: { marginTop: 0 },
                style: { backgroundColor: '#fff' },
                indicatorStyle: {
                    borderBottomColor: "#00A300",
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
            initialRouteName="MyOrderScreen"
            screenOptions={{
                headerStyle: { backgroundColor: '#00A300' },
                headerTintColor: '#fff',
                
                headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
            }}>
            <Stack.Screen
                name="CartScreen"
                component={MyCart}
                options={{ title: 'Cart' }} />

            <Stack.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{ title: 'Address' }} />

        </Stack.Navigator>
    );
}

function MyOrdersStack() {
    return (
        <Stack.Navigator
            initialRouteName="MyOrderScreen"
            screenOptions={{
                headerStyle: { backgroundColor: '#00A300' },
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
                headerStyle: { backgroundColor: '#00A300' },
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
                headerStyle: { backgroundColor: '#00A300' },
                headerTintColor: '#fff',
                
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

        </Stack.Navigator>
    );
}

const RegisterLoginStack = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="light-content" backgroundColor="#00A300" />
            <Stack.Navigator
            //   initialRouteName="Check"
                initialRouteName="Register"
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
                    options={{ title: 'Registation' }} />


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
                name="Check"
                component={Check}
                headerTitleStyle={{alignSelf: 'center'}}
                options={{headerShown: false}}
               // options={{ title: 'Home' }}
               />

                <Stack.Screen
                    name="tabHome"
                    component={tabStacks}
                    headerTitleStyle={{ alignSelf: 'center' }}
                    options={{ headerShown: false }}
                // options={{ title: 'Home' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )

}


const tabStacks = () => {
    return (

        <Tab.Navigator
            // initialRouteName="HomeScreen"
            tabBarOptions={{
                activeTintColor: tabColor,
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Shop',
                    tabBarIcon: ({ color, size }) =>

                    (
                        color == tabColor ?
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain', }} source={require('./app/assets/images/icons/shop_green.png')} />
                            :
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./app/assets/images/icons/shop.jpeg')} />
                    ),
                }} />
            <Tab.Screen
                name="CartStack"
                component={CartStack}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        color == tabColor ?
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./app/assets/images/icons/cart_green.png')} />
                            :
                            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./app/assets/images/icons/cart.jpeg')} />
                    ),
                }} />


            <Tab.Screen
                name="MyOrdersStack"
                component={MyOrdersStack}
                options={{
                    tabBarLabel: 'MyOrders',
                    tabBarIcon: ({ color, size }) => (
                        color == tabColor ?
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/orders_green.png')} />
                            :
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/orders.png')} />
                    ),
                }} />

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
                }} />




            <Tab.Screen
                name="MyCheckStack"
                component={MyCheckStack}
                options={{
                    tabBarLabel: 'Check',
                    tabBarIcon: ({ color, size }) => (
                        color == tabColor ?
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/account_green.png')} />
                            :
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('./app/assets/images/icons/account.png')} />
                    ),
                }} />
        </Tab.Navigator>


    )

}

const RNRedux = () => {
    return (
        <Provider store={store}>

            {RegisterLoginStack()}
            {/* {tabStacks()} */}

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

AppRegistry.registerComponent(appName, () => RNRedux);
