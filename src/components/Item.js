import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Item.css";
import * as FaIcons from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const Item = (props) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const handleCloseModal = () => {
    dispatch({ type: "MODAL_SHOW", payload: false });
  };

  const handleShowModal = () => {
    dispatch({ type: "MODAL_SHOW", payload: true });
  };
  function onTriggerDelete() {
    props.triggerDelete(props.itemData.id);
    handleClose();
  }
  function onTriggerEdit() {
    cart.filter((cart) => {
      if (cart.id !== props.itemData.id) {
        return null;
      } else {
        handleShowWarning();
      }
      return cart;
    });
    props.triggerEdit(props.itemData.id);
    handleShowModal();
  }

  function onTriggerOrder() {
    props.triggerOrder(props.itemData);
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showWarning, setShowWarning] = useState(false);
  const handleShowWarning = () => setShowWarning(true);
  const handleCloseWarning = () => setShowWarning(false);

  function closeWarningModalAndShowEditModal() {
    handleCloseWarning();
    handleCloseModal();
  }

  return (
    <React.Fragment>
      <div className="products-container ">
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
            <button type="button" onClick={() => onTriggerEdit(props.itemData)}>
              <span className="edit">Edit</span>
              <FaIcons.FaPen className="pen" />
            </button>
            <button onClick={handleShow}>
              <span className="delete-btn">Delete</span>
              <FaIcons.FaTrashAlt className="trash" />
            </button>
          </span>
        </div>
        {/* Delete Modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title className="modal-title" style={{ fontSize: "0.9em" }}>
              Do you want to delete{" "}
              <strong>{props.itemData.name}? This cannot be undone.</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Button variant="danger" onClick={onTriggerDelete} className="yes">
              Yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              No
            </Button>
          </Modal.Body>
        </Modal>

        <Modal
          show={showWarning}
          onHide={handleCloseWarning}
          backdrop="static"
          keyboard={false}
          centered
          style={{ height: "auto", zIndex: 10000 }}
          id="true-modal"
        >
          <div className="warning-modal">
            <div className="warning-text">
              {" "}
              <strong style={{ textTransform: "uppercase", color: "red" }}>
                You already have this item in your cart, updating this item also
                means it will be deleted in your cart. You may add this again in
                your cart once updated. Would you like to proceed?
              </strong>
              <div className="warning-btn-container">
                <button onClick={handleCloseWarning} className="warning-yes">
                  Yes
                </button>
                <button
                  variant="primary"
                  onClick={closeWarningModalAndShowEditModal}
                  className="warning-no"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </React.Fragment>
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
