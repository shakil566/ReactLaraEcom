import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Customer/>}/>
          <Route exact path="/add-customer" element={<AddCustomer/>}/>
        </Routes>
    </Router>
  );
}

export default App;
