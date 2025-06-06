document.getElementById("rzp-button").onclick = function (e) {
  var options = {
    key: "rzp_test_k5MAwerJgMsoOC",
    amount: 1000000,                      //We will get this from the payment/init api
    currency: "INR",                      //We will get this from the payment/init api
    name: "Simplify Money",
    description: "Test Transaction",
    order_id: "order_QdyrYFUWlhqonH",    //We will get this from the payment/init api
    handler: function (response) {
      alert("Payment successful!");
      console.log("Payment ID:", response.razorpay_payment_id);
      console.log("Order ID:", response.razorpay_order_id);
      console.log("Signature:", response.razorpay_signature);
    },
    prefill: {
      name: "Karthik Reddy",
      email: "kar@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#F37254",
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
};
