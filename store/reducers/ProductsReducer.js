import { SET_PRODUCTS } from '../actions/productsActions';


const initialState = {
    products: []  
};


const productsReducer = (state= initialState,action) => {

    switch (action.type) {
      case SET_PRODUCTS:
        
        return {
            products  : action.payload
        };
        default:
          return state
    }
  
  };
  
  
  export default productsReducer;
