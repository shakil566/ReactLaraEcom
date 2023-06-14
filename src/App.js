import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import Footer from "./pages/layouts/Footer";
import Header from "./pages/layouts/Header";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/inventory" element={<Inventory/>}/>
          <Route exact path="/customer" element={<Customer/>}/>
          <Route exact path="/add-customer" element={<AddCustomer/>}/>
          <Route exact path="/customer/:id/edit" element={<EditCustomer/>}/>
        </Routes>
        {/* <Footer/> */}
    </Router>
  );
}

export default App;
