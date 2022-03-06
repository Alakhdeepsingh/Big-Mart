import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {newOrderReducer,myOrdersReducer,orderReducer} from "./reducers/orderReducer";


  import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
  } from "./reducers/userReducer";
  

const reducer = combineReducers({
product: productReducer,
productDetails: productDetailsReducer,
user: userReducer,
profile: profileReducer,
forgotPassword: forgotPasswordReducer,
cart: cartReducer,
newOrder: newOrderReducer,
myOrders: myOrdersReducer,
orderDetails: userDetailsReducer,
newReview: newReviewReducer,
newProduct: newProductReducer,
product: productReducer,
allOrders: allUsersReducer,
order: orderReducer,
allUsers: allUsersReducer,
userDetails: userDetailsReducer,
productReviews: productReviewsReducer,
review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
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