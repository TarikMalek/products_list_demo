import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsList from '../screens/ProductsList';
import ProductDetail from '../screens/ProductDetail';


const RootStackNav = createNativeStackNavigator();


function RootStack(props) {

    return (

        <RootStackNav.Navigator
        screenOptions={{
            headerShown:false,
        }}
        initialRouteName='ProductsList'
      >


        <RootStackNav.Screen
            name="ProductsList"
            component={ProductsList}

        /> 


        <RootStackNav.Screen
        name="ProductDetail"
        component={ProductDetail}

        /> 

      </RootStackNav.Navigator>



    )
};



export default RootStack;
