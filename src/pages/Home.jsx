import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "../components/Item";
import ItemSelect from "../components/ItemSelect";
import NavigationBar from "../components/NavigationBar";
import { Carousel, Alert } from "react-bootstrap";
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
  const showAlert = useState(true);

  useEffect(() => {
    // if (itemList) {
    //   setLoading(true);
    // }
    let subtotal = 0;
    cart.map((cartItem) => (subtotal += cartItem.quantity * cartItem.price));
    // setTotal(subtotal);
    dispatch({ type: "TOTAL", payload: subtotal });
  }, [cart, dispatch]);

  function onItemDelete(id) {
    let deleteItems = itemList.filter((d) => id !== d.id);
    // setItems(deleteItems);
    dispatch({ type: "DELETE_ITEM", payload: deleteItems });

    let cartDelete = cart.filter((cartItem) => id !== cartItem.id);
    dispatch({ type: "DELETE_ITEM_IN_CART", payload: cartDelete });

    cart
      .filter((cartItem) => cartItem.id === id)
      .map((cart) => {
        if (cart.quantity > 0) {
          let qty = cartCounter - cart.quantity;
          dispatch({
            type: "UPDATED_QTY_CART_COUNTER",
            payload: qty,
          });
        }
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

// class App extends Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       items: [
//         {
//           id: 1,
//           name: "Burger",
//           price: 50,
//           category: "Food",
//           image: "https://image.flaticon.com/icons/svg/1046/1046784.svg"
//         },
//         {
//           id: 2,
//           name: "Pizza",
//           price: 100,
//           category: "Food",
//           image: "https://image.flaticon.com/icons/svg/1046/1046771.svg"
//         },
//         {
//           id: 3,
//           name: "Fries",
//           price: 25,
//           category: "Food",
//           image: "https://image.flaticon.com/icons/svg/1046/1046786.svg"
//         },
//         {
//           id: 4,
//           name: "Coffee",
//           price: 35,
//           category: "Drink",
//           image: "https://image.flaticon.com/icons/svg/1046/1046785.svg"
//         },
//         {
//           id: 5,
//           name: "Iced Tea",
//           price: 45,
//           category: "Drink",
//           image: "https://image.flaticon.com/icons/svg/1046/1046782.svg"
//         },
//         {
//           id: 6,
//           name: "Hot Tea",
//           price: 45,
//           category: "Drink",
//           image: "https://image.flaticon.com/icons/svg/1046/1046792.svg"
//         }
//       ]
//     };
//   }

//   onItemDelete( id ){
//     console.log(`Delete item with ID: ${id}`);
//   }

//   onItemEdit( id ){
//     console.log(`Edit item with ID: ${id}`);
//   }

//   onAddToCart( id ){
//     console.log(`Item with ID: ${id} added to cart`);
//   }

//   render() {
//     return (
//       <div className="main-main-container d-flex flex-column justify-content-center align-items-center">
//         <div className="main-container d-flex flex-column justify-content-start align-items-center">
//           <div className="title-and-choose-category-container d-flex flex-column align-items-center w-100">
//             <h2>Restaurant App</h2>
//             <div class="dropdown">
//               <a class="btn btn-info dropdown-toggle" href="#" role="button" id="dropdownMenuLink" d-bs-toggle="dropdown" aria-expanded="false"> Select Category</a>
//               <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
//                 <li><a class="dropdown-item" href="#">Action</a></li>
//                 <li><a class="dropdown-item" href="#">Another action</a></li>
//                 <li><a class="dropdown-item" href="#">Something else here</a></li>
//               </ul>
//             </div>
//         </div>
//           <div className="items-container d-flex flex-row flex-wrap justify-content-center align-items-center">

//             {
//               this.state.items.map( item => {
//                 return( <Item itemData = {item
//                 } triggerOrder={ this.onAddToCart } triggerEdit={ this.onItemEdit } triggerDelete={ this.onItemDelete } key={item.id} /> )
//               })
//             }
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
