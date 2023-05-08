import { TEST } from '../actions/testActions';


const initialState = {
    test: false  
};


const testReducer = (state= initialState,action) => {
    switch (action.type) {
      case TEST:
        return {
          test: !state.test
        };
        default:
          return state
    }
  
  };
  
  
  export default testReducer;


