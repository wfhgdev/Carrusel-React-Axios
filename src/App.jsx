import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import NewProduct from "./pages/createprod/NewProduct";
import Navbar from "./components/navbar/Navbar";


function App() {
  return (
    <>
      <main>
        <Navbar />
        <Routes>
          {<Route path="/" element={<Home />} />}
          {<Route path="/create-product" element={<NewProduct />} />}
        </Routes>
      </main>
    </>
  );
}

export default App;