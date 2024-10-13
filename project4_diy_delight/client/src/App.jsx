import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout.jsx";
import AddShirt from "./pages/AddShirt.jsx";
import DetailShirt from "./pages/DetailShirt.jsx";
import EditShirt from "./pages/EditShirt.jsx";
import AllShirts from "./pages/AllShirts.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddShirt />} />
        <Route path="shirts" element={<AllShirts />} />
        <Route path="shirts/:shirtID" element={<DetailShirt />} />
        <Route path="edit/:shirtID" element={<EditShirt />} />
      </Route>
    </Routes>
  );
}

export default App;
