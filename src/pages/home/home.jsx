import Footer from "../../components/footer";
import AllProducts from "./AllProducts";
import Banner from "./banner";
import Recommended from "./Recommended";
import TopSelling from "./TopSelling";

export default function Home() {
  return (
    <>
      <Banner />
      <TopSelling />
      <Recommended />
      <AllProducts />
    </>
  );
}
