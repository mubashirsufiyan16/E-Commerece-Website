import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner";
import Product from "./Product";
function Home() {
  return (
    <div>
      <Navbar/>
      <HeroBanner />
      <Product />
    </div>
  );
}

export default Home;
