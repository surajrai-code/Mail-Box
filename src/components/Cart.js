import React, { useContext, useState } from "react";
import CartContext from "../Store/Cart-Context";
import { Button } from "react-bootstrap";
function Cart() {
  const [show, setShow] = useState(false);
  const CartCntx = useContext(CartContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let total = 0;
  CartCntx.cartStore.forEach((item) => {
    total += Number(item.price);
  });

  return (
    <>
      <Button onClick={handleShow}>
        CART
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product name</th>
            <th scope="col">Description</th>
            <th scope="col">price</th>
            <th scope="col">quantity</th>
          </tr>
        </thead>
        <tbody>
          {CartCntx.cartStore.map((product, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={handleClose}>
        Close
      </Button>
      <p>Total amount: ${total}</p>
    </>
  );
}

export default Cart;
