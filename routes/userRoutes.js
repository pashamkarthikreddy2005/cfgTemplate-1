const router=require('express').Router()
const userController=require('../controllers/userController')

router.get('/allUsers',userController.findUsers)
router.get('/allAdmins',userController.findAdmins)
router.get('/currentUser',userController.findCurrentUser)


module.exports=router