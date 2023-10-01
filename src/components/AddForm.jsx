import React, { useState } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";

const AddForm = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Chicken");
  const [image, setImage] = useState("");

  const handleCloseModal = () => {
    dispatch({ type: "ADD_PRODUCT_MODAL_SHOW", payload: false });
  };

  function clearForm() {
    setCategory("Chicken");
    setName("");
    setPrice("");
    setImage("");
  }

  const formSubmit = (e) => {
    e.preventDefault();
    let newItem = {
      id: Math.floor(Math.random() * 10000),
      name,
      price,
      category,
      image,
    };

    props.triggerAddItem(newItem);
    clearForm();
    handleCloseModal();
  };

  return (
    <>
      <form onSubmit={formSubmit}>
        <div className="">
          <input
            type="text"
            className="form-control input-name"
            placeholder="Enter Food Name"
            onChange={(data) => setName(data.target.value)}
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
            onChange={(data) => setPrice(data.target.value)}
            value={price}
            required
          />
        </div>
        <div
          className="d-block "
          style={{
            marginTop: "10px",
            marginLeft: "0.5px",
            width: "100%",
            border: "1px solid #CED4DA",
            borderRadius: "5px",
          }}
        >
          <div
            className="d-flex flex-column"
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          >
            <label
              htmlFor="category"
              style={{
                marginLeft: "10px",
                padding: 0,
                color: "rgb(108,117,125)",
              }}
            >
              Set Category for your product
            </label>
            <select
              className="btn btn-info dropdown-toggle"
              onChange={(data) => setCategory(data.target.value)}
              value={category}
              style={{
                marginLeft: "10px",
                marginBottom: "20px",
                width: "40%",
              }}
            >
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
        </div>
        <div className="">
          <label htmlFor="formFile" className="form-label add-product-image">
            Add Product Image
          </label>
          <input
            className="form-control"
            type="text"
            id="formFile"
            onChange={(data) => setImage(data.target.value)}
            placeholder="Paste an image URL"
            value={image}
            required
          />
        </div>
        <input className="btn btn-primary btn-save" type="submit" value="Add Item" />
      </form>
      <button
        className="btn btn-danger btn-save"
        onClick={handleCloseModal}
        style={{ width: "100%", marginTop: "8px", marginBottom: 0 }}
      >
        Exit Without Saving
      </button>
    </>
  );
};

export default AddForm;
