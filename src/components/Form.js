import React, { useState, useEffect } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
const Form = (props) => {
  const dispatch = useDispatch();
  const toUpdateItem = useSelector((state) => state.toUpdateItem); // eto yung lagyan ng
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState("Chicken");
  const [image, setImage] = useState("");

  const handleCloseModal = () => {
    dispatch({ type: "MODAL_SHOW", payload: false });
  };

  useEffect(() => {
    if (toUpdateItem.id) {
      setName(toUpdateItem.name);
      setPrice(toUpdateItem.price);
      setCategory(toUpdateItem.category);
      setImage(toUpdateItem.image);
    }
  }, [toUpdateItem]);

  function clearForm() {
    setCategory("Chicken");
    setName("");
    setPrice("");
    setImage("");
  }

  const formSubmit = (e) => {
    e.preventDefault();
    let updatedItem = {
      id: toUpdateItem.id,
      name,
      price,
      category,
      image,
    };
    props.onTriggerUpdateItem(updatedItem);
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
        <div className="dropdown mt-4">
          <select
            className="btn btn-info dropdown-toggle"
            onChange={(data) => setCategory(data.target.value)}
            value={category}
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
        <div className="">
          <label htmlFor="formFile" className="form-label add-product-image">
            Add Product Image
          </label>
          <input
            className="form-control"
            type="text"
            id="formFile"
            onChange={(data) => setImage(data.target.value)}
            placeholder="Paste A URL"
            value={image}
            required
          />
        </div>
        <input
          className="btn btn-primary btn-save"
          type="submit"
          value="Update Item"
          onClick={handleCloseModal}
        />
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

export default Form;
