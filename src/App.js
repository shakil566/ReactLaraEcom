import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import About from "./components/admin/About";
import Contact from "./components/admin/Contact";
import MasterLayout from "./layouts/admin/MasterLayout";


function App() {
  return (
    <BrowserRouter>
      <MasterLayout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MasterLayout>
    </BrowserRouter>
  );
}

export default App;