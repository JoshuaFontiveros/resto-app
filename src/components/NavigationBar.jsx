import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import "./NavigationBar.css";
import { IconContext } from "react-icons";
import { SidebarData } from "../data/SidebarData";
import { useSelector, useDispatch } from "react-redux";
import { Table, Modal, Offcanvas } from "react-bootstrap";
import Form from "./Form";
import AddForm from "./AddForm";

const NavigationBar = (props) => {
  const dispatch = useDispatch();
  const show2 = useSelector((state) => state.show);
  const addProductModalShow = useSelector((state) => state.addProductModalShow);

  const handleClose = () => {
    dispatch({ type: "MODAL_SHOW", payload: false });
  };

  const handleCloseAddProduct = () => {
    dispatch({ type: "ADD_PRODUCT_MODAL_SHOW", payload: false });
  };

  const handleShowAddProduct = () => {
    dispatch({ type: "ADD_PRODUCT_MODAL_SHOW", payload: true });
  };

  const [showCanvas, setShowCanvas] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [counter, setCounter] = useState(0);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  // states from our reducer

  const itemList = useSelector((state) => state.items);
  const cart = useSelector((state) => state.cart);
  const cartCounter = useSelector((state) => state.cartCounter);

  useEffect(() => {
    let subtotalHolder = 0;
    if (cart && cartCounter) {
      cart.map(
        (cartSubtotal) =>
          (subtotalHolder += cartSubtotal.quantity * cartSubtotal.price)
      );
      let counterHolder = 0;
      counterHolder += cartCounter;
      setLoading(true);
      setCounter(counterHolder);
      setSubTotal(subtotalHolder);
    }
  }, [cart, cartCounter]);

  /* add new product */
  function addNewProduct(item) {
    let addedProduct = [...itemList, item];
    dispatch({ type: "UPDATED_ITEMS", payload: addedProduct });
  }

  function triggerUpdateItem(updatedItem) {
    let itemFiltered = itemList.filter((item) => {
      if (
        item.name === updatedItem.name &&
        item.price === updatedItem.price &&
        item.category === updatedItem.category &&
        item.image === updatedItem.image
      ) {
        alert(
          `Oops! You haven't changed any data, please try again to update!`
        );
      } else {
        let updatedItems = itemList.map((item) => {
          if (item.id === updatedItem.id) {
            let newUpdatedItem = updatedItem;
            item = { ...newUpdatedItem };
          }
          return item;
        });
        dispatch({ type: "UPDATED_ITEMS", payload: updatedItems });
        let cartDelete = cart.filter(
          (cartItem) => updatedItem.id !== cartItem.id
        );
        dispatch({ type: "DELETE_ITEM_IN_CART", payload: cartDelete });
        cart
          .filter((cartItem) => cartItem.id === updatedItem.id)
          .map((cart) => {
            if (cart.quantity > 1) {
              let qty = cartCounter - cart.quantity;
              dispatch({
                type: "UPDATED_QTY_CART_COUNTER",
                payload: qty,
              });
            } else {
              let zeroQty = 0;
              dispatch({
                type: "UPDATED_QTY_CART_COUNTER",
                payload: zeroQty,
              });
            }
            return cart;
          });
      }
      return item;
    });
  }

  function onItemDeleteInCart(id) {
    let cartDelete = cart.filter((cartItem) => id !== cartItem.id);
    dispatch({ type: "DELETE_ITEM_IN_CART", payload: cartDelete });
    cart
      .filter((cartItem) => cartItem.id === id)
      .map((cart) => {
        if (cart.quantity > 1) {
          let qty = cartCounter - cart.quantity;
          dispatch({
            type: "UPDATED_QTY_CART_COUNTER",
            payload: qty,
          });
        } else {
          let zeroQty = 0;
          dispatch({
            type: "UPDATED_QTY_CART_COUNTER",
            payload: zeroQty,
          });
        }
        return cart;
      });
  }

  const changeQuantityHandler = (id, operation) => {
    dispatch({
      type: "CHANGE_QUANTITY",
      payload: { id: id, operation: operation },
    });

    let qtyCounter = cartCounter;
    if (operation === 1) {
      qtyCounter = cartCounter + 1;
      dispatch({ type: "ADD_QTY", payload: qtyCounter });
    }
    if (operation === -1) {
      qtyCounter = cartCounter - 1;
      dispatch({ type: "DEDUCT_QTY", payload: qtyCounter });
    }
  };

  /* Showing sidebar */
  function showSideBar() {
    setSideBar(!sidebar);
  }

  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div
          className="navbar"
          style={{ position: "fixed", top: 0, zIndex: 999 }}
        >
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </Link>
          <Link to="/">Restaurant App</Link>
          <div className="cart-and-add-product-logo-container">
            <div className="cart-logo ">
              <a className="all-products" href="#products" rel="noreferrer">
                All Products
              </a>
              <div className="cart-counter-container">
                <span className="counter">
                  {loading && cart.length >= 1 ? counter : null}
                </span>
                <span>
                  <FaIcons.FaCartPlus
                    className="cart"
                    onClick={handleShowCanvas}
                  />
                </span>
              </div>
              <Offcanvas
                show={showCanvas}
                onHide={handleCloseCanvas}
                placement="end"
                name="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {loading && cart.length > 0 ? (
                    <>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th colSpan={3} style={{ textAlign: "center" }}>
                              Qty
                            </th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart && cart.length > 0
                            ? cart.map((cartItem2) => (
                                <tr key={cartItem2?.id}>
                                  <td>{cartItem2.name}</td>
                                  <td>
                                    {cart.id !== cartItem2.id &&
                                    cartItem2.quantity <= 1 ? (
                                      <FaIcons.FaMinus
                                        disabled
                                        style={{ color: "gray", width: "12px" }}
                                      />
                                    ) : (
                                      <FaIcons.FaMinus
                                        style={{
                                          color: "black",
                                          width: "12px",
                                        }}
                                        onClick={() =>
                                          changeQuantityHandler(
                                            cartItem2.id,
                                            -1
                                          )
                                        }
                                      />
                                    )}
                                  </td>
                                  <td>{cartItem2.quantity}</td>
                                  <td>
                                    <FaIcons.FaPlus
                                      style={{
                                        color: "rgb(0,0,0)",
                                        width: "12px",
                                      }}
                                      onClick={() =>
                                        changeQuantityHandler(cartItem2.id, 1)
                                      }
                                    />
                                  </td>
                                  <td className="numbers">
                                    &#8369;{cartItem2.price}
                                  </td>
                                  <td className="numbers">
                                    &#8369;
                                    {Math.round(
                                      cartItem2.price * cartItem2.quantity * 100
                                    ) / 100}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    <IconContext.Provider
                                      value={{ color: "red" }}
                                    >
                                      <FaIcons.FaTrashAlt
                                        onClick={() =>
                                          onItemDeleteInCart(cartItem2.id)
                                        }
                                      />
                                    </IconContext.Provider>
                                  </td>
                                </tr>
                              ))
                            : ""}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td
                              className="numbers"
                              style={{ fontWeight: "bold" }}
                            >
                              &#8369;
                              {Math.round(subtotal * 100) / 100}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ) : (
                    `Your Cart Is Empty. Addu to cart now!`
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <span>
              <MdIcons.MdBookmarkAdd
                className="add-product"
                onClick={handleShowAddProduct}
              />
            </span>
          </div>
        </div>

        {/* Modal of Edit Product */}
        <Modal
          show={show2}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: 1050 }}
        >
          <Modal.Header>Product Information</Modal.Header>
          <Modal.Body>
            <Form onTriggerUpdateItem={triggerUpdateItem} />
            <FaIcons.FaTimes />
          </Modal.Body>
        </Modal>
        {/* End of modal of edit product */}

        {/* Modal of Add Product */}
        <Modal show={addProductModalShow} onHide={handleCloseAddProduct}>
          <Modal.Header>Add Product</Modal.Header>

          <Modal.Body>
            <AddForm triggerAddItem={addNewProduct} />

            <FaIcons.FaTimes />
          </Modal.Body>
        </Modal>
        {/* End of modal of add product */}

        {/* Mobile nav-data */}
        <nav className={sidebar ? "nav-menu active " : "nav-menu "}>
          <ul className="nav-menu-items " onClick={showSideBar}>
            <li className="navbar-toggle ">
              <Link to="#" className="menu-bars ">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item) => {
              return (
                <li key={item.id} className={item.cName}>
                  <a href={item.path} rel="noreferrer">
                    <span className="">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </React.Fragment>
  );
};

export default NavigationBar;
