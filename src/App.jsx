import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Page imports
import Home from "./modules/home/Home";
import Login from "./modules/login/Login";
import Signup from "./modules/signUp/Signup";
import About from "./modules/about/about";
import ContactUs from "./modules/contact/contactUs";
import Feedback from "./modules/feedback/feedback";
import Menu from "./modules/menu/menu";
import Cart from "./modules/cart/cart";
import Notification from "./modules/notification/notification";
import ForgotPassword from "./modules/forgotPw/components/ForgotPassword";
import HelpCenter from "./modules/help/HelpCenter";
import OrderNow from "./modules/orderNow/OrderNow";
import Invoice from "./modules/invoice/components/Invoice";
import Profile from "./modules/profile/components/profile";
import MenuDetails from "./modules/menu/components/menu 7/MenuDetails";
import OrderDetails from "./modules/OrderDetails/components/status/OrderDetails";
import OrderHistory from "./modules/OrderDetails/components/history/OrderHistory";
import FavoriteOrders from "./modules/OrderDetails/components/favorite/FavoriteOrders";

// Product card imports (dynamic menu routing can be handled with less repetition)
import ProductCard from "./modules/menu/components/menu 4/ProductCard";
import ProductCard2 from "./modules/menu/components/menu 4/ProductCard2";
import ProductCard3 from "./modules/menu/components/menu 4/ProductCard3";
import ProductCard4 from "./modules/menu/components/menu 4/ProductCard4";
import ProductCard5 from "./modules/menu/components/menu 4/ProductCard5";
import ProductCard6 from "./modules/menu/components/menu 4/ProductCard6";

import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Static page routes */}
        <Route path="/aboutUs" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/help" element={<HelpCenter />} />

        {/* Menu-related routes */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:menuType" element={<MenuDetails />} />

        {/* Product-specific routes */}
        <Route path="/biriyani" element={<ProductCard />} />
        <Route path="/fried-rice" element={<ProductCard2 />} />
        <Route path="/kottu" element={<ProductCard3 />} />
        <Route path="/noodles" element={<ProductCard4 />} />
        <Route path="/chicken-dishes" element={<ProductCard5 />} />
        <Route path="/fish-dishes" element={<ProductCard6 />} />

        {/* Profile-related routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<Notification />} />

        {/* Order-related routes */}
        <Route path="/order" element={<OrderNow />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/status" element={<OrderDetails />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/fav" element={<FavoriteOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
