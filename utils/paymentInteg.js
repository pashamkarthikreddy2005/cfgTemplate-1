const Razorpay = require('razorpay');
const crypto = require('crypto');


var instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});


const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt || `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


const validateOrder=async (req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    try {
        const sha=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest=sha.digest("hex");
        if(digest!==razorpay_signature)
                throw new Error("Transaction is not legit!")
        res.status(200).json({
            message:"success",
            order_id:razorpay_order_id,
            payment_id:razorpay_payment_id,
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong",
            reason:error.message,
            success:false
        })
    }
}

module.exports={createOrder, validateOrder};