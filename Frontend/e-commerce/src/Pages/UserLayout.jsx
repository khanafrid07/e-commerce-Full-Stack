import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="w-[100%]">

      <Footer/>
      </footer>
    </>
  );
}
