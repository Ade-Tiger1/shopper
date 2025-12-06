import { AlertTriangle, XCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reason = queryParams.get("reason") || "unknown_error";

  const messageMap = {
    cancelled: "Payment was cancelled before completion.",
    failed: "Payment failed. Please try again.",
    error: "An unexpected payment error occurred.",
    verification_failed: "Verification failed. Contact support.",
    transaction_not_found: "Transaction not found.",
    unknown_error: "Something went wrong with your payment.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
        {/* Icon Circle */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          {messageMap[reason]}
        </p>

        {/* Box */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-red-200">
          <div className="flex justify-center items-center gap-2 text-red-600 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            <span>Transaction Error</span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            If money was deducted, it will be automatically refunded by Flutterwave.
          </p>
        </div>

        {/* Try Again Button */}
        <Link
          to="/checkout"
          className="w-full block bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Try Again
        </Link>

        {/* Home Link */}
        <Link to="/" className="block mt-4 text-red-600 underline text-sm">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
