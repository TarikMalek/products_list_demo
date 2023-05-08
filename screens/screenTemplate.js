import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';


const Template = props => {
    return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>My Challenges Screen</Text>
            </View>    
    ) 
}








const styles = StyleSheet.create({
    title:{
        fontSize:25,
        color:'white',
        fontFamily : 'luckiest-guy',
    },

    titleContainer: {
        
        position: 'absolute', 
        top: 0,
        left: 0, 
        right: 0,
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'orange',
       

    },
})

export default React.memo(Template);