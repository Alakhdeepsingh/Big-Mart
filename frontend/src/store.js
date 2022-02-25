import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer } from "./reducers/productReducer";


const reducer = combineReducers({
product: productsReducer,
});

let initialState = {

  };

const middleware = [thunk];

const store = createStore(
  reducer,
  //product+ bhut sarri chijho ka reducer banna hai mtb ki product+ aur bhi chijho ko kesse fetch karni hai, combine reducer ka isliye likha 
  //hai takki hamm sarri chijho ka reducer banna sakhe hai ham usse yaha pass kar sakhe
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;