
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
      <Footer />
      
      <Router>
        <Routes>
        <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />}/> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
