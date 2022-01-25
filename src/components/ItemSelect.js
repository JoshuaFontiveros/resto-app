import React from "react";

const ItemSelect = (props) => {
  return (
    <select
      style={{ zIndex: "50" }}
      className="btn btn-warning "
      onChange={(data) => props.selectCategory(data.target.value)}
    >
      <option value={"All"}>All</option>
      <option value={"Chicken"}>Chicken</option>
      <option value={"Veggie"} className="dropdown-item">
        Veggie
      </option>
      <option value={"Chickeroni"} className="dropdown-item">
        Chickeroni
      </option>
    </select>
  );
};

export default ItemSelect;
