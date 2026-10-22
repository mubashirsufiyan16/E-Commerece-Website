import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../HeroBanner/HeroBanner";
import Product from "./product/Product";
import { useEffect, useState } from "react";

function Home() {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const getCountFromLocal = JSON.parse(
      localStorage.getItem("cartProduct") || "[]"
    );

    const totalQuantity = getCountFromLocal.reduce(
      (total: number, item: { quantity?: number }) =>
        total + (item.quantity || 0),
      0
    );

    setQuantity(totalQuantity);
  }, []);

  return (
    <div>
      <Navbar quantity={quantity} />
      <HeroBanner />
      <Product quantity={quantity} setQuantity={setQuantity}/>
    </div>
  );
}

export default Home;
