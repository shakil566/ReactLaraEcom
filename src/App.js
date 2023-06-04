import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Customer/>}/>
          <Route exact path="/add-customer" element={<AddCustomer/>}/>
          <Route exact path="/customer/:id/edit" element={<EditCustomer/>}/>
          {/* <Route exact path="/delete-customer/:id" element={<AddCustomer/>}/> */}
        </Routes>
    </Router>
  );
}

export default App;
