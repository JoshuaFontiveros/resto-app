import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/Item";
import ItemSelect from "../components/ItemSelect";
import NavigationBar from "../components/NavigationBar";
import { Carousel } from "react-bootstrap";
import CarouselData from "../data/CarouselData";
import SectionOne from "../data/SectionOne";
import SectionTwo from "../data/SectionTwo";
import Footer from "../components/Footer";

import "./Home.css";
const Home = (props) => {
  const itemList = useSelector((state) => state.items);
  const cart = useSelector((state) => state.cart);
  const cartCounter = useSelector((state) => state.cartCounter);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    let subtotal = 0;
    cart.map((cartItem) => (subtotal += cartItem.quantity * cartItem.price));
    dispatch({ type: "TOTAL", payload: subtotal });
  }, [cart, dispatch]);

  function onItemDelete(id) {
    let deleteItems = itemList.filter((d) => id !== d.id);
    dispatch({ type: "DELETE_ITEM", payload: deleteItems });

    let cartDelete = cart.filter((cartItem) => id !== cartItem.id);
    dispatch({ type: "DELETE_ITEM_IN_CART", payload: cartDelete });
    cart
      .filter((cartItem) => cartItem.id === id)
      .map((cart) => {
        if (cart.quantity >= 1) {
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

  function onItemEdit(id) {
    let itemEdit = itemList.find((item) => item.id === id);
    dispatch({ type: "ITEM_EDIT", payload: itemEdit });
  }

  function onAddToCart(item) {
    /* Logic 
      1. Check if item exist
        - if it does, increase quantity
        - add item to cart with quantity = 1  
    */
    let cartQty = cartCounter + 1;
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      // increase quantity
      let updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity += 1;
        }
        return cartItem;
      });

      dispatch({ type: "ADD_QTY", payload: cartQty });
      dispatch({ type: "ADD_TO_CART", payload: updatedCart });
    } else {
      // add item to cart
      let newAddCart = [...cart, { ...item, quantity: 1 }];
      dispatch({ type: "ADD_QTY", payload: cartQty });
      dispatch({ type: "ADD_TO_CART", payload: newAddCart });
    }
  }

  return (
    <React.Fragment>
      <NavigationBar
        key={itemList?.id}
        itemData={itemList}
        triggerOrder={onAddToCart}
        triggerEdit={onItemEdit}
      />

      <div className="carousel-container">
        <Carousel>
          {CarouselData.map((item) => {
            return (
              <Carousel.Item key={item?.id}>
                <div className={item.img_container}>
                  <img
                    className={item.className}
                    src={item.src}
                    alt={item.alt}
                  />
                </div>
                <Carousel.Caption className={item.caption_cName}>
                  <p className={item.p1_cName}>{item.p1}</p>
                  <h2 className={item.h2_cName}>{item.h2}</h2>
                  <h3 className={item.h3_cName}>{item.h3}</h3>
                  <h4 className={item.h4_cName}>{item.h4}</h4>
                  <h5 className={item.h5_cName}>{item.h5}</h5>
                  <button className={item.btnCName}>{item.btnData}</button>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="section-one ">
        {SectionOne.map((e) => {
          return (
            <React.Fragment key={e?.id}>
              <img src={e.src} alt={e.alt} className={e.imgClass} />
              <span className={e.spanClass}>
                <h2>{e.h2_data}</h2>
                <p>{e.p_data}</p>
                <button>{e.btn_data}</button>
              </span>
            </React.Fragment>
          );
        })}
      </div>
      <div className="section-two ">
        <span className="section-2-span">
          {SectionTwo.map((d) => {
            return (
              <img key={d?.id} className={d.cName} src={d.url} alt={d.alt} />
            );
          })}
        </span>
      </div>
      <div className="products-section ">
        <h2 id="products">Our Pizzas</h2>
        <ItemSelect selectCategory={setSelectedCategory} />
        <div className="card-main-container">
          {itemList
            .filter((item) => {
              if (selectedCategory.includes("All")) {
                return item;
              }
              return item.category === selectedCategory;
            })
            .map((item) => {
              return (
                <Item
                  key={item?.id}
                  itemData={item}
                  triggerOrder={onAddToCart}
                  triggerEdit={onItemEdit}
                  triggerDelete={onItemDelete}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Home;
