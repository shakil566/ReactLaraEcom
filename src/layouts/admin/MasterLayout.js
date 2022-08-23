import React from 'react';
import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import routes from '../../routes/route';

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">

        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <Router>
              <Routes>
                {routes.map((route, idx) => {

                  return (

                    route.component && (

                      <Route

                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <route.component {...props} />
                        )}
                      />
                    )

                  )

                })}
              </Routes>
            </Router>
            <Navigate from="/admin" to="/admin/dashboard" />
          </main>
          <Footer />
        </div>

      </div>
    </div>
  );
}
export default MasterLayout;
