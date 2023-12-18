import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkLists, setCheckLists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <BrowserRouter>
      <TopNavigationBar cart = {cart} isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/"
          element={<Home
            products={products}
            setProducts={setProducts}
            convertPrice={convertPrice}
          />
          }
        />
        <Route
          path="/product/:id"
          element={<Product convertPrice={convertPrice} cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Basket cart = {cart} setCart = {setCart} convertPrice = {convertPrice} 
        checkLists = {checkLists} setCheckLists = {setCheckLists}/>} 
        />
        <Route
          path="/login"
          element={<Login isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
