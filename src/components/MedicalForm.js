
import React, { useContext, useState } from "react";
import Cart from "./Cart";
import { Button } from "react-bootstrap";
import CartContext from "../Store/Cart-Context";
const MedicalForm = () => {
    const CartCtx = useContext(CartContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
  
    const nameChangeHandler = (e) => {
      setName(e.target.value);
    };
    const descriptionChangeHandler = (e) => {
      setDescription(e.target.value);
    };
    const priceChangeHandler = (e) => {
      setPrice(e.target.value);
    };
    const quantityChangeHandler = (e) => {
      setQuantity(e.target.value);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      const products = {
        productName: name,
        description: description,
        price: price,
        quantity: quantity
      };
      CartCtx.addProduct(products);
    };
  return (
    <><div style={{textAlign:'center'}}>MEDICALSHOP</div>
    <div style={{textAlign:'center'}}>
      <form onSubmit={submitHandler}>
        <div>
          <label>Product name</label>
          <input
            type="text"
            required
            onChange={nameChangeHandler}
            value={name}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            required
            onChange={descriptionChangeHandler}
            value={description}
          ></input>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            required
            onChange={priceChangeHandler}
            value={price}
          ></input>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            required
            onChange={quantityChangeHandler}
            value={quantity}
          ></input>
        </div>
        <div>
          <Button type="submit" variant="info">
            Add Product
          </Button>
        </div>
        <Cart />
      </form>
    </div>
    </>
  )
}

export default MedicalForm;