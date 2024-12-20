import Header from "./layout/header";
import Footer from "./layout/footer";
import { Outlet } from "react-router-dom";
import "./styles/product.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnHeaderPage from "./components/ReturnHeaderPage";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ReturnHeaderPage />
      <ToastContainer />
    </>
  );
}

export default App;
