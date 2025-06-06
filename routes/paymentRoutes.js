const router=require('express').Router()
const {createOrder, validateOrder}=require('../utils/paymentInteg')

router.post("/init",createOrder)
router.post('/validate',validateOrder)

module.exports=router