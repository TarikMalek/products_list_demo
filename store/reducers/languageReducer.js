import { CHANGE_LANGUAGE } from "../actions/languageActions";
import {i18n } from '../../Languages';


  


const initialState = {
    lang : 'en'  
};


export const langReducer = (state= initialState,action) => {
    switch (action.type) {
      case CHANGE_LANGUAGE:
        i18n.locale = action.payload

        return {
          lang: action.payload
        };
        default:
          return state
    }
  
  };
  
  


