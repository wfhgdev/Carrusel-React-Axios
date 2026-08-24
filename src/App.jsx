import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import NewProduct from "./pages/createprod/NewProduct";


function App() {
  return (
    <>
      <main>
        <Routes>
          {<Route path="/" element={<Home />} />}
          <Route path="/create-product" element={<NewProduct />} />
        </Routes>
      </main>
    </>
  );
}

export default App;