import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
    <nav className="overflow-hidden">

      <Navbar />
    </nav>
      <main className="overflow-y-hidden py-2">
        <Outlet />
      </main>
      <footer className="w-[100%]">

      <Footer/>
      </footer>
    </>
  );
}
