import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./layouts/admin/About";
import MasterLayout from "./layouts/admin/MasterLayout";


function App() {
  return (
    <BrowserRouter>
      <MasterLayout>
        <Routes>
          <Route exact path="/about" element={<About />} />
        </Routes>
      </MasterLayout>
    </BrowserRouter>
  );
}

export default App;
