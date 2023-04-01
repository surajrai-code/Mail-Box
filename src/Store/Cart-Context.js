import React, { useEffect, useState } from "react";

const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);

  let url = "https://crudcrud.com/api/3a7d507b879948bcb061681a7cdd8652";
  const getData = async () => {
    try {
      const response = await fetch(`${url}/Medical`);

      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async (products) => {
    try {
      const response = await fetch(`${url}/Medical`, {
        method: "POST",
        body: JSON.stringify(products),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const postCartData = async (cartData) => {
    try {
      const response = await fetch(`${url}/list`, {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getCartData();
    } catch (err) {
      console.log(err);
    }
  };

  const getCartData = async () => {
    try {
      const response = await fetch(`${url}/list`);
      const data = await response.json();
      setCartData(data);
      console.log(cartData, "list");
    } catch (err) {
      console.log(err);
    }
  };

  const addProductHandler = (products) => {
    postData(products);
  };
  const addToCartHandler = (newData) => {
    postCartData(newData);
  };

  useEffect(() => {
    getData();
    getCartData();
  }, []);

  const contextValue = {
    productStore: data,
    addProduct: addProductHandler,
    cartStore: cartData,
    addToCart: addToCartHandler,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
