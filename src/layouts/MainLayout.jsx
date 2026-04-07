import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh" }}>
        <Outlet /> {/* Page content will render here */}
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
