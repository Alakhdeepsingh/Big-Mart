import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
//   useState is a Hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value.
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
        //trim karne se sarre spaces khatam hojaege
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    //   What is history push?
// pushState() In an HTML document, the history. pushState() method adds an entry to the browser's session history stack
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;