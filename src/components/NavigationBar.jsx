import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import "./NavigationBar.css";
import { IconContext } from "react-icons";
import { SidebarData } from "../data/SidebarData";
import { useSelector, useDispatch } from "react-redux";
import {
  OverlayTrigger,
  Popover,
  Table,
  Modal,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Form from "./Form";

const NavigationBar = props => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCanvas, setShowCanvas] = useState(false);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const [sidebar, setSideBar] = useState(false);

  const [subtotal, setSubTotal] = useState(0);

  // states from our reducer
  const itemList = useSelector(state => state.items);
  const cart = useSelector(state => state.cart);
  const total = useSelector(state => state.total);

  useEffect(() => {
    let subtotalHolder = 0;
    cart.map(
      cartSubtotal =>
        (subtotalHolder += cartSubtotal.quantity * cartSubtotal.price)
    );
    setSubTotal(subtotalHolder);
  });
  /* add new product */
  function addNewProduct(item) {
    let addedProduct = [...itemList, item];
    dispatch({ type: "UPDATED_ITEMS", payload: addedProduct });
  }

  function triggerUpdateItem(updatedItem) {
    let updatedItems = itemList.map(item => {
      if (item.id === updatedItem.id) {
        item = { ...updatedItem };
      }
      return item;
    });

    dispatch({ type: "UPDATED_ITEMS", payload: updatedItems });
    // // setItems(updatedItems);
    // dispatch({ type: "ITEM_EDIT", payload: null });

    // setToUpdateItemState(null);
    // setToUpdateItem(null);
  }

  function addAnotherOneItem(cartItem2) {
    alert(`You have added to cart: ${cartItem2.name}`);
    /* Logic
      1. Check if item exist
        - if it does, increase quantity
        - add item to cart with quantity = 1
    */
    // if (cart.find(cartItem2 => cartItem2.id === cartItem.id)) {
    //   // increase quantity
    //   let updatedCart = cart.map(cartItem2 => {
    //     if (cartItem2.id === cartItem.id) {
    //       cartItem2.quantity += 1;
    //     }
    //     return cartItem2;
    //   });
    //   // setCart(updatedCart);
    //   dispatch({ type: "ADD_TO_CART", payload: updatedCart });
    // } else {
    //   // add item to cart
    //   let newAddCart = [...cart, { ...cartItem, quantity: 1 }];
    //   dispatch({ type: "ADD_TO_CART", payload: newAddCart });
    // }
  }
  function onTriggerOrder() {
    props.triggerOrder(props.itemData);
  }

  function onItemDeleteInCart() {
    let cartDelete = cart.filter(cartItem => itemList.id !== cartItem.id);
    // setCart(cartUpdate);
    dispatch({ type: "DELETE_ITEM_IN_CART", payload: cartDelete });
  }

  /* Showing sidebar */
  function showSideBar() {
    setSideBar(!sidebar);
  }

  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </Link>
          <Link to="/">Restaurant App</Link>

          <div className="cart-and-add-product-logo-container">
            <div className="cart-logo ">
              {/* <span>Home</span> */}
              <span>All Products</span>
              <div className="cart-counter-container">
                <span className="counter">
                  {cart.length > 0 ? cart.length : null}
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
                name="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th colspan={3} style={{ textAlign: "center" }}>
                          Qty
                        </th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length > 0 && cart ? (
                        cart.map(cartItem2 => (
                          <tr key={cartItem2.id}>
                            <td>{cartItem2.name}</td>
                            <td>
                              <button onClick={onTriggerOrder}>+</button>
                            </td>
                            <td>{cartItem2.quantity}</td>
                            <td>
                              <button onClick={onItemDeleteInCart}>-</button>
                            </td>
                            <td width="50%">
                              &#8369;{cartItem2.price * cartItem2.quantity}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <IconContext.Provider value={{ color: "red" }}>
                                <FaIcons.FaTrashAlt
                                  onClick={onItemDeleteInCart}
                                />
                              </IconContext.Provider>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <td colspan={4} style={{ textAlign: "center" }}>
                          Cart Is Empty
                        </td>
                      )}
                      <tr>
                        <td></td>
                        <td colspan={5} style={{ paddingLeft: "45px" }}>
                          Grand Total: &#8369;{Math.round(subtotal * 100) / 100}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Offcanvas.Body>
              </Offcanvas>
              {/* </OverlayTrigger> */}
            </div>
            <span>
              <MdIcons.MdBookmarkAdd
                className="add-product"
                onClick={handleShow}
              />
            </span>
          </div>
        </div>

        {/* Modal of add product */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form
              // toUpdateId={toUpdateItem?.id}
              // itemName={toUpdateItem?.name}
              // itemPrice={toUpdateItem?.price}
              // itemCategory={toUpdateItem?.category}
              // itemImage={toUpdateItem?.image}
              triggerAddItem={addNewProduct}
              onTriggerUpdateItem={triggerUpdateItem}
            />
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

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
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
