import React from 'react';
import {
     Image ,
     Dimensions,
     TouchableOpacity,
 } from 'react-native';
import {Box,Text} from 'native-base';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ListProductComponent = ({nav,product,index})=>{
    // const image =  product.thumbnail
    // const [imageHeight,setImageHeight] = useState(null);

    
    // useEffect(()=>{
    //     NativeImage.getSize(image,(w,h)=>{
    //         setImageHeight(h)
    //     });
    // },[])

    // console.log(index,imageHeight)
    
   

    

    return (
        <TouchableOpacity
        style={{
            width:windowWidth*.45,
            height:windowHeight*.25,
            margin:10,
            alignItems:'center',
        }}
        onPress={()=> nav.navigate('ProductDetail',product)}
        >
        <Box
        w={windowWidth*.45}
        h={windowHeight*.25}
        >
           <Box
           w={'100%'}
           h={'70%'}
           alignItems={'center'}
           >

            <Image 
            key={Math.floor(Math.random() * 1000000).toString()}
            source={{uri: product.thumbnail} }
            style={{
                width:'100%',
                height:'95%',
                // backgroundColor:'black'
            }}
            alt='image'
            resizeMode='cover'
           
            />
           </Box>
            
        
           <Box
           h={'25%'}
           >

            <Text
            fontSize={12}
            fontWeight={'bold'}
            color={'amber.700'}
            >
                By {product.brand}
            </Text>
            <Text
             fontSize={14}
             fontWeight={'bold'}
            >
                 {product.title}
            </Text>
            <Text>
                
                ${product.price}
            </Text>
           </Box>

        </Box>
        </TouchableOpacity>
    )
};



export default ListProductComponent