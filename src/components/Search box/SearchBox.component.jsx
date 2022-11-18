import React from "react";
import "./SearchBox.styles.css";

const SearchBox = ({ placeholder, handleChange, label, type, userRef }) => (
  <div className="col-sm">
    <div>
      {label}
      <br />
      <div className="inputBox">
        <input
          type={type}
          ref={userRef}
          className="search"
          placeholder={placeholder}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  </div>
);
export default SearchBox;
