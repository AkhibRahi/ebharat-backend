import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/MyContext';
import Layout from '../../components/layout/layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteCart } from '../../redux/cartSlice';
import axios from 'axios';


function Cart() {

  const context = useContext(myContext)
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart)

  const setCartStorage = localStorage.setItem('cart', JSON.stringify(cartItems));

  useEffect(() => {
    setCartStorage;
    paymentModal();
  }, [cartItems])

  // subtotal//

  const [totalAmount, setTotalAmount] = useState(0);

  const paymentModal = () => {
    let temp = 0;
    cartItems.forEach(cartItem => {
      temp = temp + parseInt(cartItem.price)
    });
    setTotalAmount(temp);
  }

  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount

  // deletecart//

  const deleteBtn = (item) => {
    dispatch(deleteCart(item))
    toast.success("product deleted")
  }

  const [custName, setCustName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")


  // razarpay integration//

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    var obj = {
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      receipt: "64738",
      custName,
      address,
      pincode,
      phoneNumber

    }
    // creating a new order
    const result = await axios.post("http://localhost:9012/createOrder", obj);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    console.log("result", result);
    // Getting the order details back

    const options = {
      key: "rzp_test_tgtTyVunoXppwz", // Enter the Key ID generated from the Dashboard
      amount: obj.amount.toString(),
      currency: obj.currency,
      name: "E-bharat",
      description: "Test Transaction",
      order_id: result.data.id,
      handler: async function (response) {
        // const data = {
        //     orderCreationId: order_id,
        //     razorpayPaymentId: response.razorpay_payment_id,
        //     razorpayOrderId: response.razorpay_order_id,
        //     razorpaySignature: response.razorpay_signature,
        // };
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const buyNow = () => {
    displayRazorpay();
  }


  return (

    <Layout>
      <div className="h-full bg-gray-100 pt-20 " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              return <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <img src={item.imageURL} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.name}</h2>
                    <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                    <p className="mt-1 text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                   {/* <div className='quantity'>
                    <button className='quantity-minus'>-</button>
                    <input  size={1} value={1} type="text" placeholder='1' />
                    <button className='quantity-plus'>+</button>
                   </div> */}
                  </div>
                  <div onClick={() => deleteBtn(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                  </div>
                  
                </div>
              </div>
            })}


          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
              </div>
            </div>
            <Modal
              custName={custName}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setCustName={setCustName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}

            />

          </div>
        </div>
      </div>
    </Layout>

  )
}

export default Cart