import AllProducts from "./AllProducts";
import Banner from "./banner";
import Recommended from "./Recommended";
import TopSelling from "./TopSelling";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <TopSelling />
        <Recommended />
        <AllProducts />
      </div>
    </>
  );
}
