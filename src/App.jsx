import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="sm:pt-20">
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
