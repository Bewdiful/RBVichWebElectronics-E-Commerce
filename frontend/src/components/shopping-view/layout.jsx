// components/shopping-view/layout.jsx
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "../common/footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <ShoppingHeader /> {/* Ensure this is here only ONCE */}
      <main className="flex flex-col w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;