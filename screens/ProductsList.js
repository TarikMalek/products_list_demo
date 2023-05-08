import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList ,Dimensions,View,TouchableOpacity } from 'react-native';

import { Box,Text ,HStack, VStack,Icon} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { axiosInstance } from '../service/axiosService';
import { useDispatch,useSelector } from 'react-redux';
import { setProducts } from '../store/actions/productsActions';
import { changeLanguage } from '../store/actions/languageActions';
import { i18n } from '../Languages';
import ListProductComponent from '../components/ListProductComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const ProductsList = props => {
    const [loading,setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products); 
    const lang = useSelector(state =>  state.language.lang);

   

    useEffect(()=>{
    const data =  axiosInstance.get('https://dummyjson.com/products')
    .then((res)=> {
        dispatch(setProducts(res['data']['products']))
    })
    .catch((err)=> console.log(err))
    .finally(()=> setIsLoading(false))

    },[])
    


    const Header = ()=>{

        return (
                <>
                {/* Header */}
                <VStack
                w={windowWidth}
                h={windowHeight*.15}
                bg={'#6B5635'}
                alignItems={'center'}
                >
                {/* header items */}
                <HStack
                w={'95%'}
                justifyContent={'space-around'}
                position={'absolute'}
                bottom={1}
                
                >
                    <Box
                    w={'15%'}
                    alignItems={'center'}
                    >
                    <TouchableOpacity onPress={()=> {
                    console.log('back')

                    }
        
                    
                    }
                    >
                        <Icon
                        as={Ionicons}
                        name={'chevron-back-sharp'}
                        size={'4xl'}
                        color={'white'}
                    
                        />
                    </TouchableOpacity>

                    </Box>
                       

                    <Box
                     w={'80%'}
                     alignItems={'center'}
                    >
                        <Text
                        fontSize={20}
                        fontWeight={'bold'}
                        color={'white'}
                        style={{fontFamily : lang === 'en'  ? 'luckiest-guy' : null}}
                        >
                            {i18n.t('productsList')}
                        </Text>
                    </Box>

                    <Box
                     w={'15%'}
                     alignItems={'center'}
                     justifyContent={'center'}
                    >
                        <TouchableOpacity
                        onPress={()=> {
                            dispatch(changeLanguage(lang === 'en' ? 'ar' : 'en'))
                        }}
                        >
                        <Box
                        bg={'white'}
                        borderRadius={5}
                        h={null}
                        w={'100%'}
                        alignItems={'center'}
                        >
                            <Text
                            px={1}
                            fontWeight={'bold'}
                            fontSize={16}
                            >
                                {lang === 'en' ? 'RTL' : 'LTR'}
                            </Text>
                    
                        </Box>
                        </TouchableOpacity>
                       
                    </Box>
                      

                </HStack>

                </VStack>
                
                {/* Discount */}
                <HStack
                w={windowWidth}
                h={windowHeight*.1}
                alignItems={'center'}
                justifyContent={'space-around'}
                bg={'#AE3557'}
                >
                    <Box
                    w={'10%'}
                    />
                       
                    <Box
                     w={'80%'}
                     alignItems={'center'}
                    >
                        <Text
                        fontSize={20}
                        fontWeight={'bold'}
                        color={'white'}
                        >
                        {lang === 'en' ? 
                        `25% Discount`
                        :
                        `${i18n.t('discount')} 25%`
                        }
                       
                        </Text>

                        <Text
                        fontSize={16}
                        color={'white'}
                        >
                        {i18n.t('getItNow')}
                        </Text>
                    </Box>

                    <Box
                     w={'10%'}
                    />
                          

                </HStack>
                </>
        )
    }
    
    return (
            <View style={styles.container}>
                

                <FlatList 
                contentContainerStyle={{width:windowWidth}}
                data={products}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={Header}
                keyExtractor={item => item['id'].toString()}
                renderItem={( {item,index} ) =>    
                <ListProductComponent 
                product={item} 
                index={index}
                nav={props.navigation}
                />
                 }
                ListFooterComponent={
                    <View style={{marginBottom:100}}>
    
                    </View>
                }
                
            
                ListEmptyComponent = { 
               
                    <Box
                    mt={2}
                    w={windowWidth*.9}
                    h={60}
                    bg={'white'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    >
    
                    <Text
                    style={{
                        fontSize : lang === 'ar' ? 20 : 16,
                        color: 'white',
                        fontFamily : lang === 'ar' ? 'amiri-bold' : null , 
                        
                    }}
                    >
                        {i18n.t('noProducts')}
                    </Text>
    
                    </Box>
               
                }
                    
    
                
                />

                
            </View>    
    ) 
}








const styles = StyleSheet.create({

    container: {
        flex: 1,    
        alignItems: 'center',
        backgroundColor:'white',
    },
    listStyle : {
        // flex:1,
        // alignSelf:'center',
        // width:'95%',
    
        // alignItems : 'center'
    }
})

export default React.memo(ProductsList);