import { configureStore } from "@reduxjs/toolkit" ;
import  useReducer  from "./UserSlice.jsx";


const store = configureStore({
    reducer : {
        user : useReducer 
    }
});

export default store ;
    
    
