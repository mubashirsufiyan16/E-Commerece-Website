import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner";
import Product from "./Product";
import { useEffect, useState } from "react";
function Home() {
  const [quantity, setQuantity] = useState(0);
  let getCountFromLocal = JSON.parse(localStorage.getItem("cartProduct")) || [];
  useEffect(() => {
    setQuantity(getCountFromLocal?.length);
  }, [getCountFromLocal]);
  return (
    <div>
      <Navbar quantity={quantity} />
      <HeroBanner />
      <Product quantity={quantity} setQuantity={setQuantity} />
     </div>
  );
}

export default Home;
