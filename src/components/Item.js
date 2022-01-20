import React, { useState } from "react";
import "./Item.css";
import * as FaIcons from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const Item = props => {
  function onTriggerDelete() {
    props.triggerDelete(props.itemData.id);
    handleClose();
  }
  // function onTriggerEdit() {
  //   props.triggerEdit(props.itemData.id);
  // }

  function onTriggerOrder() {
    props.triggerOrder(props.itemData);
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="products-container">
      <div className="card-img">
        <img
          src={props.itemData.image}
          alt="Pizza Flavors"
          className="prod-img"
        />
        <span>{props.itemData.name}</span>
        <span style={{ fontFamily: "sans-serif" }}>
          &#8369;{props.itemData.price}
        </span>
        <span className="prod-btn-container">
          <button onClick={onTriggerOrder}>
            <span className="add-to-cart">Add To Cart</span>{" "}
            <FaIcons.FaCartPlus className="cart-plus" />
          </button>
          <button
            type="button"
            // onClick={() => onTriggerEdit(props.itemData)}
          >
            <span className="edit">Edit</span>
            <FaIcons.FaPen className="pen" />
          </button>
          <button onClick={handleShow}>
            <span className="delete-btn">Delete</span>
            <FaIcons.FaTrashAlt className="trash" />
          </button>
        </span>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title" style={{ fontSize: "0.9em" }}>
            Do you want to delete <strong>{props.itemData.name}</strong> ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Button variant="danger" onClick={onTriggerDelete} className="yes">
            Yes
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Item;

// className Item extends Component {
//     render() {
//         return (
//             <div className="item-data-container d-flex align-items-center border-line-white border-radius-15">
//                     {
//                         /*
//                             Display Item data here
//                             - name, price, category and image
//                         */

//                         <div className="image-container d-flex justify-content-center align-items-center border-radius-15">
//                             <img src={ props.itemData.image } width="80" height="140" alt="food-icon-images"/>
//                         </div>
//                     }
//                 <div className="item-actions d-flex flex-column align-items-center ">
//                     <p><strong>{ props.itemData.name }</strong></p>
//                     <p>Php { props.itemData.price }</p>
//                     <button onClick={ () => props.triggerOrder(props.itemData.id)  }>Order</button>
//                     <button onClick={ () => props.triggerEdit(props.itemData.id)   }>Edit</button>
//                     <button onClick={ () => props.triggerDelete(props.itemData.id) }>Delete</button>
//                 </div>
//             </div>
//         )
//     }
// }
