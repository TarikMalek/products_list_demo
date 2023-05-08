import React, { useState,useMemo } from 'react';
import { StyleSheet, Image , ScrollView ,View,TouchableOpacity,Dimensions } from 'react-native';

import { Box,Text ,HStack, VStack,Actionsheet,Button} from 'native-base';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector,useDispatch } from 'react-redux';
import { setTestState } from '../store/actions/testActions';
import { i18n } from '../Languages';
import { Rating } from 'react-native-ratings';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Range = (start, stop, step) =>{
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};


const ProductDetail = props => {
    const reducerState = useSelector(state => state.test.test);
    const dispatch = useDispatch();
    const lang = useSelector(state =>  state.language.lang);
    const product = props.route.params
    const [quantity,setQuantity] = useState(1)
    const [showActionSheet,setShowActionSheet] = useState(false);


    const quantityRange = useMemo(() => Range(1,product.stock+1), [product.stock]);


    const QuantityActionSheet = ()=>{


        return (
            <Actionsheet 
            isOpen={showActionSheet} 
            onClose={()=> setShowActionSheet(false)} 
            hideDragIndicator
            w={windowWidth}
            >
                <Actionsheet.Content 
                >
                    <ScrollView
                    contentContainerStyle={{alignItems:'center'}}
                    showsVerticalScrollIndicator={false}

                    >
                        {quantityRange.map(item =>
                        <TouchableOpacity
                        key={item.toString()}
                        style={{width:windowWidth*.5,alignItems:'center'}}
                        onPress={()=>{
                            setQuantity(item)
                            setShowActionSheet(false)
                        }}
                        >
                             <Box
                             w={'50%'}
                             bg={quantity === item ? 'emerald.500' : 'muted.100'}
                             borderRadius={20}
                             my={2}
                             alignItems={'center'}
                             justifyContent={'center'}
                             >
                            <Text
                            fontWeight={'bold'}
                            fontSize={20}
                            >
                                {item}
                            </Text>
                             </Box>
                        </TouchableOpacity>
                       
                        )

                        }
                    </ScrollView>

                </Actionsheet.Content>
                
            </Actionsheet>
        )
    }


    return (
            <View style={styles.titleContainer}>
                <ScrollView
                showsVerticalScrollIndicator={false}

                >
               {/* Header */}
               <VStack
                w={windowWidth}
                h={'10%'}
                bg={'#6C9431'}
                alignItems={'center'}
                >
                {/* header items */}
                <HStack
                w={'95%'}
                justifyContent={'space-around'}
                alignItems={'center'}
                position={'absolute'}
                bottom={1}
                
                >
                    <Box
                    w={'10%'}
                    alignItems={'center'}
                    />
                   
                       

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
                            {i18n.t('productDetails')}
                        </Text>
                    </Box>

                    <Box
                     w={'10%'}
                     alignItems={'center'}
                     justifyContent={'center'}
                    >
                        <TouchableOpacity
                        onPress={()=> props.navigation.goBack()}
                        >
                            <Text
                            fontSize={25}
                            color={'white'}
                            >
                                    X
                            </Text>
                        </TouchableOpacity>
                      
                    
                       
                    </Box>
                      

                </HStack>

                </VStack>

                {/* product image */}
                <Box
                w={'100%'}
                h={windowHeight*.40}
                // bg={'black'}
                alignItems={'flex-end'}
                mb={5}
                >
                <Image 
                key={Math.floor(Math.random() * 1000000).toString()}
                source={{uri: product.thumbnail} }
                style={{
                    width:'100%',
                    height:'100%',
                }}
                alt='image'
                resizeMode='cover'
            
                />
                </Box>

                {/* description */}

                <Box
                w={'90%'}
                h={null}
                alignItems={'center'}
                alignSelf={'center'}
                >
                    <HStack
                    w={'95%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    mb={5}
                    >
                        <VStack
                        w={'75%'}
                        >
                            <Text
                            fontSize={18}
                            >
                                {product.title}
                            </Text>

                            <Text
                            fontWeight={'bold'}
                            color={'#6C9431'}
                            >
                                By {product.brand}
                            </Text>
                        </VStack>


                        <Text
                        fontSize={25}
                        fontWeight={'bold'}
                        >
                            ${product.price}
                        </Text>

                    </HStack>

                    {/* description text  */}
                    <Box
                    w={'95%'}
                    mb={5}
                    >
                    <Text
                    fontSize={14}
                    fontWeight={'bold'}
                    textAlign={'justify'}
                    >
                        {product.description}
                        </Text>
                    </Box>


                   

                </Box>

                 {/* quantity */}
                 <HStack
                    w={'95%'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    mb={5}
                    >
                        
                        <Text
                        fontSize={25}
                        fontWeight={'bold'}
                        mx={5}
                        >
                            ${product.price*quantity}
                        </Text>

                        <TouchableOpacity
                        onPress={()=>setShowActionSheet(true)}
                        >
                        <Box
                        w={50}
                        h={30}
                        bg={'muted.100'}
                        alignItems={'center'}
                        >
                            <Text
                           p={1} 
                            >
                            {quantity}
                            </Text>
                           
                        </Box>
                        </TouchableOpacity>
                        
                    </HStack>

                    <Button
                    colorScheme={'success'}
                    bg={'#6C9431'}
                    w={'95%'}
                    borderRadius={20}
                    mb={10}
                    alignSelf={'center'}
                    >
                        But it 
                    </Button>


                    {/* rating */}
                    <HStack
                    w={'95%'}
                    alignItems={'center'}
                    alignSelf={'center'}
                    >
                        <Text
                        fontSize={45}
                        mr={5}
                        color={'#6C9431'}
                        >
                            {product.rating}
                        </Text>

                        <VStack
                        alignItems={'flex-start'}
                        >
                        <Rating
                        imageSize={20}
                        readonly
                        startingValue={product.rating}
                        fractions="{1}"
                        />
                            <Text>
                                Based on 7 customer reviews
                            </Text>
                        </VStack>
                    </HStack>

                    {/* reviews */}

                    <Box
                    w={'90%'}
                    h={400}
                    bg={'muted.100'}
                    alignSelf={'center'}
                    alignItems={'center'}
                    >
                        <HStack
                        w={'90%'}
                        mt={5}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        >

                            <Text
                            fontSize={20}
                            fontWeight={'bold'}
                            >
                                Nice Product
                            </Text>

                            <Text>
                                Regina Joplin
                            </Text>

                        </HStack>

                        <HStack
                        w={'90%'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mt={1}
                        >

                        <Rating
                        imageSize={20}
                        readonly
                        startingValue={product.rating}
                        fractions="{1}"
                        />
                            <Text>
                                May 8th 2023
                            </Text>

                        </HStack>

                        <Text
                        textAlign={'justify'}
                        fontSize={14}
                        mt={3}
                        p={2}
                        >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                         when an unknown printer took a galley of type and scrambled it to make a type 
                         specimen book. It has survived not only five centuries, but also the leap 
                         into electronic typesetting, remaining essentially unchanged.
                          It was popularised in the 1960s with the release of Letraset sheets 
                          containing Lorem Ipsum passages, and more recently with desktop publishing
                           software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>

                    </Box>


                    {/* footer */}
                    <Box    
                    w={'100%'}
                    h={200}
                    bg={'white'}
                    />
            {showActionSheet &&
            <QuantityActionSheet />
            }
                   

            </ScrollView>
            </View>    
    ) 
}








const styles = StyleSheet.create({

    titleContainer: {
        
        flex:1,
        // alignItems: 'center',
        backgroundColor:'white',
       

    },
})

export default React.memo(ProductDetail);