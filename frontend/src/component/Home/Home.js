import React, { Fragment,useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";

import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
import Product from "./Product.js";



const Home = () => {
    const dispatch = useDispatch();
    const {loading,error,products,productsCount} = useSelector(state=>state.product)
    //user selector se jho bhi product store ke state ke andar hotta hai vo le sakte hai
    useEffect(()=>{
        dispatch(getProduct());
    }, [dispatch]);
return(
    <Fragment>
        <MetaData title="BigMart"/>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
          {products &&
              products.map((product) => (
                <Product product ={products} />
              ))}
          </div>
        </Fragment>
      
  
  );
};

export default Home;