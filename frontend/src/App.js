import Header from "./layout/header";
import Footer from "./layout/footer";
import { Outlet } from "react-router-dom";
import "./styles/product.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
