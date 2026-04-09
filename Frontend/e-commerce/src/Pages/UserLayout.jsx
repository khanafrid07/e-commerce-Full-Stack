import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
    <nav className="overflow-hidden w-full">

      <Navbar />
    </nav>
      <main className="overflow-y-auto overflow-x-hidden w-full">
        <Outlet />
      </main>
      <footer className="w-full overflow-x-hidden">

      <Footer/>
      </footer>
    </>
  );
}
