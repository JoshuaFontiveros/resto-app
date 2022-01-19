import React, { useState, useEffect } from "react";

import "./Form.css";

const Form = props => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState("Chicken");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (props.toUpdateId) {
      setName(props.itemName);
      setPrice(props.itemPrice);
      setCategory(props.itemCategory);
      setImage(props.itemImage);
    }
  }, [props]);

  const formSubmit = data => {
    data.preventDefault();
    let newItem = {
      id: props.toUpdateId
        ? props.toUpdateId
        : Math.floor(Math.random() * 10000),
      name,
      price,
      category,
      image,
    };
    props.toUpdateId
      ? props.onTriggerUpdateItem()
      : props.triggerAddItem(newItem);

    setCategory("Chicken");
    setName("");
    setPrice("");
    setImage("");
    console.log(newItem);
  };

  return (
    <>
      <div class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formSubmit}>
        <h2>Product Information</h2>
        <div className="">
          <label htmlFor="name" className="form-label input-name">
            Name
          </label>
          <input
            type="text"
            className="form-control input-name"
            placeholder="Enter Food Name"
            onChange={data => setName(data.target.value)}
            value={name}
            required
          />
        </div>
        <div className="">
          <label htmlFor="Price" className="form-label input-price">
            Price
          </label>
          <input
            type="number"
            className="form-control input-price"
            id="Price"
            placeholder="Input Price"
            onChange={data => setPrice(data.target.value)}
            value={price}
            required
          />
        </div>
        <div className="dropdown mt-4">
          <select
            className="btn btn-info dropdown-toggle"
            onChange={data => setCategory(data.target.value)}
            value={category}>
            <option value="Chicken" className="dropdown-item">
              Chicken
            </option>
            <option value="Veggie" className="dropdown-item">
              Veggie
            </option>
            <option value="Chickeroni" className="dropdown-item">
              Chickeroni
            </option>
          </select>
        </div>
        <div className="">
          <label htmlFor="formFile" className="form-label add-product-image">
            Add Product Image
          </label>
          <input
            className="form-control"
            type="text"
            id="formFile"
            onChange={data => setImage(data.target.value)}
            placeholder="Paste A URL"
            value={image}
            required
          />
        </div>
        <input
          className="btn btn-primary btn-save"
          type="submit"
          value={props.toUpdateId ? "Update Item" : "Add Item"}
        />
      </form>
    </>
  );
};

export default Form;
