import React,{useEffect,useState} from 'react'

import { StyleSheet, View,Dimensions,ActivityIndicator } from 'react-native';
import { Box ,Text,Button} from 'native-base' ;
import { NativeBaseProvider } from 'native-base';
import RootStack from './navigators/RootStackNavigator'
import * as Font from 'expo-font';
import  {navigationRef}  from './navigators/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import thunk from 'redux-thunk'
import { Provider,useDispatch } from 'react-redux';

import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import testReducer from './store/reducers/testReducer';
import productsReducer from './store/reducers/ProductsReducer';
import {langReducer} from './store/reducers/languageReducer';
import { i18n } from './Languages';
import { StatusBar } from 'expo-status-bar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const fetchFonts =  () => {
  return Font.loadAsync({
    'luckiest-guy': require('./assets/fonts/LuckiestGuy-Regular.ttf'),
    'amiri': require('./assets/fonts/Amiri-Regular.ttf'),
    'amiri-bold': require('./assets/fonts/Amiri-Bold.ttf'),
    'amiri-bold-italic': require('./assets/fonts/Amiri-BoldItalic.ttf'),
    'amiri-italic': require('./assets/fonts/Amiri-Italic.ttf'),

  });
};



const store = configureStore({
  middleware: [thunk,],
  reducer: {
    test:testReducer,
    products :  productsReducer,
    language : langReducer,
  },
})


export default function App() {
  const [ready,setReady] = useState(false)


  useEffect(() => {
    i18n.defaultLocale = 'en';
    i18n.locale = "en";
    fetchFonts().then(() => setReady(true));
  }, []);



  return (
    <Provider store={store}> 
    <NativeBaseProvider>
    <NavigationContainer ref={navigationRef}>
    {!ready ? 
    <Box
    w={windowWidth}
    h={windowHeight}
    bg={'black'}
    alignItems={'center'}
    justifyContent={'center'}
    >
    <ActivityIndicator  
      size={'large'}
      color={'white'}
    />
    </Box>
      
      :


      <RootStack />
    
    }
    
    </NavigationContainer>
    </NativeBaseProvider>
    <StatusBar style="light" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
