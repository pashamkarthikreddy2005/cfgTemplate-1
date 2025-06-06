used jwt,cookie-parser, bcrypt
2 roles ------>USER and ADMIN


1) Basic Authentication  --------->   /auth/register
                                      /auth/login
                                      /auth/delete
                                      /auth/logout

   
3) UserRoutes            --------->   /users/allUsers
                                      /users/allAdmins
                                      /users/currentUser

   
5) MessageRoutes         --------->   /message/mail
                                      /message/otp
                                      /message/sms    (Otp and message can only be sent if the mobile number is verified on twilio)

   
7) paymentRoutes         --------->   /payment/init
                                      /payment/validate(Optional)



Used Razorpay test mode for payment integration
                                               
