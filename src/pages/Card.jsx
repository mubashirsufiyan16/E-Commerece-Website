// import { Modal,Button } from "antd";

// function Card() {
//   return (
//     <div>
//       <Modal
//         title="Product Added"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={[
//           <Button
//             key="cart"
//             type="primary"
//             onClick={MoveToCart}
//           >
//             Add To Cart
//           </Button>,
//         ]}
//       >
//         {selectedProduct && (
//           <>
//             <h3>{selectedProduct.title}</h3>

//             <p>Price: Rs. {selectedProduct.price}</p>

//             <Button
//               onClick={() => {
//                 if (quantity > 1) {
//                   setQuantity(quantity - 1);
//                 }
//               }}
//             >
//               -
//             </Button>

//             <span style={{ margin: "0 15px" }}>
//               {quantity}
//             </span>

//             <Button onClick={() => setQuantity(quantity + 1)}>
//               +
//             </Button>

//             <h2>
//               Total: Rs.{" "}
//               {selectedProduct.price * quantity}
//             </h2>
//           </>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default Card
