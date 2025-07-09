import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// 🔥 Tailwind dark theme-style for toast
const toastStyle = {
  background: "#1f2937",       // bg-gray-800
  color: "#f1f5f9",            // text-gray-100
  border: "1px solid #334155", // border-gray-700
  padding: "12px 16px",
};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...", { style: toastStyle });
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("RazorPay SDK failed to load", { style: toastStyle });
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY);
    console.log("🧾 Razorpay order response:", orderResponse);



    const paymentData = orderResponse.data.data;


    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: paymentData.amount,           // ✅ Number, not string
      currency: paymentData.currency,
      order_id: paymentData.id,
      name: "ᴘᴀᴅʜᴀᴋᴜ.ɪɴ",
      description: "Thank you for purchasing",
      image: rzpLogo,
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, paymentData.amount, token);
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };



    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed", { style: toastStyle });
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment", { style: toastStyle });
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....", { style: toastStyle });
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful! You are added to the course", { style: toastStyle });
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment", { style: toastStyle });
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
